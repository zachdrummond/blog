export function getAuthors(
  parent,
  { author_ids, emails, role, usernames },
  { prisma, author }
) {
  if ((role || emails?.length > 0) && author?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return prisma.author.findMany({
    include: {
      posts: true,
    },
    where: {
      OR: [
        {
          id: {
            in: author_ids ? author_ids.map((id) => parseInt(id, 10)) : [],
          },
        },
        { email: { in: emails ? emails : [] } },
        { role: role ? role : undefined },
        { username: { in: usernames ? usernames : [] } },
      ],
    },
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

export async function getPosts(parent, args, { prisma, author }) {
  const {
    post_ids,
    author_ids,
    titles,
    categories,
    published,
    skip,
    take,
    order_by,
  } = args;
  const query = {
    where: {
      OR: [
        post_ids ? { id: { in: post_ids.map((id) => parseInt(id, 10)) } } : {},
        author_ids
          ? { authorId: { in: author_ids.map((id) => parseInt(id, 10)) } }
          : {},
        titles ? { title: { in: titles } } : {},
        categories ? { categories: { hasSome: categories } } : {},
        published !== undefined ? { published } : {},
      ],
    },
    skip,
    take,
    order_by,
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
  };

  const items = await prisma.post.findMany(query);

  const total = await prisma.post.count();

  return {
    total,
    items,
  };
}
