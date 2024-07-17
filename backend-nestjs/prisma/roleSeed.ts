import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const roles = [
    { role_name: 'ADMIN', role_description: 'Admin Role' },
    { role_name: 'PENJUAL', role_description: 'Penjual Role' },
    { role_name: 'PEMBELI', role_description: 'Pembeli Role' },
  ];

  for (const role of roles) {
    await prisma.userRole.upsert({
      where: { role_name: role.role_name },
      update: {
        ...role,
        updateAt: null,
      },
      create: {
        ...role,
        updateAt: null,
      },
    });
  }

  console.log('Seeding Role completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
//npx ts-node prisma/roleSeed.ts
