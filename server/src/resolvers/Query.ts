import { omitFields } from "../utils.js";

export function getAuthors(
  parent,
  { author_ids, emails, role, usernames },
  { prisma, author }
) {
  if ((role || emails?.length > 0) && author?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const orConditions = [];

  if (author_ids?.length > 0) {
    orConditions.push({
      author: {
        author_id: { in: author_ids.map((id) => parseInt(id, 10)) },
      },
    });
  }

  if (emails?.length > 0) {
    orConditions.push({ email: { in: emails } });
  }

  if (role !== undefined) {
    orConditions.push({ role });
  }

  if (usernames?.length > 0) {
    orConditions.push({ username: { in: usernames } });
  }

  return prisma.author.findMany({
    include: {
      posts: true,
    },
    where: orConditions.length === 0 ? {} : { OR: orConditions },
    omit: omitFields(author),
  });
}

export async function getPosts(
  parent,
  {
    post_ids,
    author_ids,
    titles,
    categories,
    published,
    skip = 0,
    take = 10,
    order_by,
  },
  { prisma, author }
) {
  const orConditions = [];

  if (post_ids?.length > 0) {
    orConditions.push({
      post_id: { in: post_ids.map((id) => parseInt(id, 10)) },
    });
  }

  if (author_ids?.length > 0) {
    orConditions.push({
      author: {
        author_id: { in: author_ids.map((id) => parseInt(id, 10)) },
      },
    });
  }

  if (titles?.length > 0) {
    orConditions.push({ title: { in: titles } });
  }

  if (categories?.length > 0) {
    orConditions.push({ categories: { hasSome: categories } });
  }

  if (published !== undefined) {
    orConditions.push({ published });
  }

  const items = await prisma.post.findMany({
    where: orConditions.length === 0 ? {} : { OR: orConditions },
    skip,
    take,
    order_by,
    include: {
      author: {
        omit: omitFields(author),
      },
    },
  });

  return {
    total: items.length,
    items,
  };
}
