const { PrismaClient } = require('@prisma/client');

console.log('Starting Prisma client test...');

try {
  const prisma = new PrismaClient();
  console.log('✓ Prisma client created successfully!');
  prisma.$disconnect().then(() => {
    console.log('✓ Disconnected from Prisma');
    process.exit(0);
  });
} catch (error) {
  console.error('✗ Error creating Prisma client:', error);
  process.exit(1);
}
