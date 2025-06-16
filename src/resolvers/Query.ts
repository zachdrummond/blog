export function getAllPosts(parent, { filter }, { prisma }) {
  const where = filter
    ? {
        OR: [
          { title: { contains: filter, mode: "insensitive" } },
          { content: { contains: filter, mode: "insensitive" } },
          { categories: { hasSome: [filter] } },
        ],
      }
    : {};

  return prisma.post.findMany({ where });
}

export function getAllAuthors(parent, args, { prisma }) {
  return prisma.author.findMany();
}

export function getAuthors(
  parent,
  { ids, emails, role, usernames },
  { prisma }
) {
  if (
    (!ids && !emails && !role && !usernames) ||
    (ids?.length === 0 &&
      emails?.length === 0 &&
      role === undefined &&
      usernames?.length === 0)
  ) {
    throw new Error("Either ID, email, role, or username must be provided.");
  }
  return prisma.author.findMany({
    where: {
      OR: [
        { id: { in: ids ? ids.map((id) => parseInt(id, 10)) : [] } },
        { email: { in: emails ? emails : [] } },
        { role: role ? role : undefined },
        { username: { in: usernames ? usernames : [] } },
      ],
    },
  });
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
