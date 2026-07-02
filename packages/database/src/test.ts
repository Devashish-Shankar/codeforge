import { prisma } from "./client/prisma.js";

async function main() {
  await prisma.$connect();

  console.log("✅ Connected");

  const users = await prisma.user.findMany();

  console.log(users);

  await prisma.$disconnect();
}

main();