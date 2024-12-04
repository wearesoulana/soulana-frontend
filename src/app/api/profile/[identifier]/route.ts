import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ identifier: string }> }
) {
  try {
    const { identifier } = await context.params;

    if (!identifier) {
      return NextResponse.json(
        { error: "Username or wallet address is required" },
        { status: 400 }
      );
    }

    // Try to find user by username first, then by wallet address
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: { equals: identifier } },
          { walletAddress: { equals: identifier } }
        ]
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
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Calculate totals
    const totalDonated = user.donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );
    const tokenBalance = user.tokens.reduce(
      (sum, token) => sum + token.amount,
      0
    );

    return NextResponse.json({
      walletAddress: user.walletAddress,
      username: user.username,
      totalDonated,
      tokenBalance,
      donationHistory: user.donations,
      tokenHistory: user.tokens,
      badges: user.badges,
      role: user.role,
    });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
} 