import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedDatabase = async () => {
  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: [
      {
        title: "GraphQL 101",
        content: "Introduction to GraphQL",
        published: true,
      },
      {
        title: "Test Title",
        content: "Test Content",
        published: false,
      },
    ],
  });

  const allPosts = await prisma.post.findMany();
  console.log(allPosts);
};

seedDatabase()
  .catch((e) => {
    console.error("Error seeding database:", e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
