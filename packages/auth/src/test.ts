import { prisma } from "@codeforge/database";

async function main() {
  await prisma.$connect();

  console.log("✅ Auth package connected to Database package");

  await prisma.$disconnect();
}

main().catch(console.error);