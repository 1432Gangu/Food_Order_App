const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10); // Default admin password

  const admin = await prisma.user.upsert({
    where: { email: "admin@foodorderapp.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@foodorderapp.com",
      password: adminPassword,
      confirmPassword: adminPassword,
      role: "admin",
    },
  });

  console.log("Admin created: ", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
