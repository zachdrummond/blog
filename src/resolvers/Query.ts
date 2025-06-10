export function getAllPosts(parent, args, { prisma }) {
  return prisma.post.findMany();
}

export function getAllAuthors(parent, args, { prisma }) {
  return prisma.author.findMany();
}

export function getPosts(parent, { ids, titles, categories }, { prisma }) {
  if (
    (!ids && !titles && !categories) ||
    (ids?.length === 0 && titles?.length === 0 && categories?.length === 0)
  ) {
    throw new Error("Either ID, title, or category must be provided.");
  }

  // Convert string IDs to integers
  const parsedIds = ids ? ids.map((id) => parseInt(id, 10)) : [];

  return prisma.post.findMany({
    where: {
      OR: [
        { id: { in: parsedIds } },
        { title: { in: titles ? titles : [] } },
        { categories: { hasSome: categories ? categories : [] } },
      ],
    },
  });
}