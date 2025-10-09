const { PrismaClient } = require("./src/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Testing Prisma directly...");

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      age: 25,
    },
  });
  console.log("Created user:", user);

  // Find all users
  const users = await prisma.user.findMany();
  console.log("All users:", users);

  // Find user by email
  const foundUser = await prisma.user.findUnique({
    where: { email: "test@example.com" },
  });
  console.log("Found user:", foundUser);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
