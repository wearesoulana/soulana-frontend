/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const badges = [
  // Role-based badges
  {
    name: 'Team Member',
    description: 'Official member of the Soulana team',
    icon: '👥',
    type: 'ROLE',
  },
  {
    name: 'Developer',
    description: 'Soulana platform developer',
    icon: '👨‍💻',
    type: 'ROLE',
  },
  {
    name: 'Admin',
    description: 'Platform administrator',
    icon: '⚡',
    type: 'ROLE',
  },
  
  // Donation-based badges
  {
    name: 'First Donation',
    description: 'Made your first donation',
    icon: '🌱',
    type: 'DONATION',
    threshold: 0.001,
  },
  {
    name: 'Generous Donor',
    description: 'Donated over 1 SOL',
    icon: '🌟',
    type: 'DONATION',
    threshold: 1,
  },
  {
    name: 'Philanthropist',
    description: 'Donated over 10 SOL',
    icon: '💫',
    type: 'DONATION',
    threshold: 10,
  },
  {
    name: 'Legendary Donor',
    description: 'Donated over 100 SOL',
    icon: '👑',
    type: 'DONATION',
    threshold: 100,
  },
  
  // Achievement badges
  {
    name: 'Early Supporter',
    description: 'Supported Soulana in its early days',
    icon: '🌅',
    type: 'ACHIEVEMENT',
  },
  {
    name: 'Multi-Project Donor',
    description: 'Donated to multiple projects',
    icon: '🎯',
    type: 'ACHIEVEMENT',
  },
];

async function main() {
  console.log('Start seeding badges...');
  
  for (const badge of badges) {
    const createdBadge = await prisma.badge.upsert({
      where: { name: badge.name },
      update: badge,
      create: badge,
    });
    console.log(`Created badge: ${createdBadge.name}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 