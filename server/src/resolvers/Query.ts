export async function getAllPosts(
  parent,
  { skip, take, orderBy },
  { prisma, author }
) {
  const items = await prisma.post.findMany({
    skip,
    take,
    orderBy,
    include: {
      author: {
        omit:
          author?.role === "ADMIN"
            ? {}
            : {
                email: true,
                password: true,
                first_name: true,
                last_name: true,
                role: true,
              },
      },
    },
  });

  const total = await prisma.post.count();

  return {
    total,
    items,
  };
}

export function getAllAuthors(parent, args, { prisma, author, where }) {
  return prisma.author.findMany({
    include: {
      posts: true,
    },
    where,
    omit:
      author?.role === "ADMIN"
        ? {}
        : {
            email: true,
            password: true,
            first_name: true,
            last_name: true,
            role: true,
          },
  });
}

export function getAuthors(
  parent,
  { ids, emails, role, usernames },
  { prisma, author }
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
  if ((role || emails?.length > 0) && author?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  const where = {
    OR: [
      { id: { in: ids ? ids.map((id) => parseInt(id, 10)) : [] } },
      { email: { in: emails ? emails : [] } },
      { role: role ? role : undefined },
      { username: { in: usernames ? usernames : [] } },
    ],
  };
  return getAllAuthors(parent, {}, { prisma, author, where });
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
