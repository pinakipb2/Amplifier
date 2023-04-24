const p = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new p.PrismaClient();

async function main() {
  try {
    var salt = await bcrypt.genSalt(10);
    var passHash = await bcrypt.hash("12345678", salt);
    const admin = await prisma.admin.upsert({
      where: { email: "admin@amplifier.com" },
      update: {},
      create: {
        email: "admin@amplifier.com",
        name: "Admin A1",
        password: passHash,
      },
    });
    console.log({ admin });
  } catch (err) {
    console.log("Admin already present in DB");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
