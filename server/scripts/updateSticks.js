// updateSticks.js
const { PrismaClient } = require("@prisma/client");
const slugify = require("slugify");

const prisma = new PrismaClient();

const updateSticks = async () => {
  try {
    const sticks = await prisma.model.findMany();

    for (const stick of sticks) {
      const slug = slugify(stick.ModelName, { lower: true });

      await prisma.model.update({
        where: { ModelID: stick.ModelID },
        data: { slug },
      });
    }

    console.log("Sticks updated successfully.");
  } catch (error) {
    console.error("Error updating sticks:", error);
  } finally {
    await prisma.$disconnect();
  }
};

updateSticks();
