import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Donation, Token, User, Badge } from "@prisma/client";

type UserWithRelations = User & {
  donations: Donation[];
  tokens: Token[];
  badges: Badge[];
};

interface DonationInput {
  amount: number;
  signature: string;
  projectId: number;
  projectTitle: string;
  status: string;
}

async function checkAndAwardBadges(userId: string, totalDonated: number) {
  // Get all donation-based badges user doesn't have yet
  const eligibleBadges = await prisma.badge.findMany({
    where: {
      type: "DONATION",
      threshold: {
        lte: totalDonated,
      },
      NOT: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    },
  });

  // Award new badges
  if (eligibleBadges.length > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        badges: {
          connect: eligibleBadges.map((badge) => ({ id: badge.id })),
        },
      },
    });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        donations: {
          orderBy: { createdAt: "desc" },
        },
        tokens: {
          orderBy: { createdAt: "desc" },
        },
        badges: true,
      },
    }) as UserWithRelations | null;

    if (!user) {
      user = await prisma.user.create({
        data: {
          walletAddress,
        },
        include: {
          donations: true,
          tokens: true,
          badges: true,
        },
      }) as UserWithRelations;
    }

    // Calculate totals
    const totalDonated = user.donations.reduce(
      (sum: number, donation: Donation) => sum + donation.amount,
      0
    );
    const tokenBalance = user.tokens.reduce(
      (sum: number, token: Token) => sum + token.amount,
      0
    );

    // Check and award any new badges
    await checkAndAwardBadges(user.id, totalDonated);

    // Fetch updated user data with new badges
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        donations: {
          orderBy: { createdAt: "desc" },
        },
        tokens: {
          orderBy: { createdAt: "desc" },
        },
        badges: true,
      },
    }) as UserWithRelations | null;

    return NextResponse.json({
      walletAddress: updatedUser?.walletAddress,
      username: updatedUser?.username,
      totalDonated,
      tokenBalance,
      donationHistory: updatedUser?.donations || [],
      tokenHistory: updatedUser?.tokens || [],
      badges: updatedUser?.badges || [],
      role: updatedUser?.role || 'USER',
    });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { walletAddress, username } = body;

    if (!walletAddress || !username) {
      return NextResponse.json(
        { error: "Wallet address and username are required" },
        { status: 400 }
      );
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: "Username must be 3-20 characters long and can only contain letters, numbers, underscores, and hyphens" },
        { status: 400 }
      );
    }

    // Check if username is already taken
    const existingUser = await prisma.user.findFirst({
      where: {
        username: { equals: username },
        NOT: {
          walletAddress: { equals: walletAddress },
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    // Update username
    const updatedUser = await prisma.user.update({
      where: { walletAddress },
      data: {
        username: username,
      },
      include: {
        donations: {
          orderBy: { createdAt: "desc" },
        },
        tokens: {
          orderBy: { createdAt: "desc" },
        },
        badges: true,
      },
    }) as UserWithRelations;

    return NextResponse.json({
      success: true,
      user: {
        walletAddress: updatedUser.walletAddress,
        username: updatedUser.username,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { error: "Failed to update username" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const walletAddress = body.walletAddress as string;
    const donation = body.donation as DonationInput;

    if (!walletAddress || !donation) {
      return NextResponse.json(
        { error: "Wallet address and donation data are required" },
        { status: 400 }
      );
    }

    // Validate donation data
    if (
      typeof donation.amount !== 'number' ||
      typeof donation.signature !== 'string' ||
      typeof donation.projectId !== 'number' ||
      typeof donation.projectTitle !== 'string' ||
      typeof donation.status !== 'string'
    ) {
      return NextResponse.json(
        { error: "Invalid donation data format" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        donations: true,
        badges: true,
      },
    }) as UserWithRelations | null;

    if (!user) {
      user = await prisma.user.create({
        data: {
          walletAddress,
        },
        include: {
          donations: true,
          badges: true,
        },
      }) as UserWithRelations;
    }

    // Create donation record
    const newDonation = await prisma.donation.create({
      data: {
        userId: user.id,
        amount: donation.amount,
        signature: donation.signature,
        projectId: donation.projectId,
        projectTitle: donation.projectTitle,
        status: donation.status,
      },
    });

    // Calculate new total donated amount
    const totalDonated = user.donations.reduce(
      (sum: number, donation: Donation) => sum + donation.amount,
      0
    ) + donation.amount;

    // Check and award badges
    await checkAndAwardBadges(user.id, totalDonated);

    // Calculate token reward
    const tokenAmount = Math.floor((donation.amount * 100) / 10);

    if (tokenAmount > 0) {
      await prisma.token.create({
        data: {
          userId: user.id,
          amount: tokenAmount,
          reason: `Reward for ${donation.amount} SOL donation to ${donation.projectTitle}`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      donation: newDonation,
      tokenAmount,
    });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { error: "Failed to process donation" },
      { status: 500 }
    );
  }
} 