import { QueryResolvers } from "../../shared/types.js";
import { omitFields } from "../utils.js";

export const queries: QueryResolvers = {
  getAuthors: (
    parent,
    { author_ids, emails, role, usernames },
    { prisma, author }
  ) => {
    // if (author.role !== "ADMIN") {
    //   throw new Error("Unauthorized");
    // }

    const orConditions = [];

    const validAuthorIds = author_ids?.filter((id) => id != null);
    if (validAuthorIds && validAuthorIds?.length > 0) {
      orConditions.push({ author_id: { in: validAuthorIds } });
    }

    const validEmails = emails?.filter((email) => email != null);
    if (validEmails && validEmails?.length > 0) {
      orConditions.push({ email: { in: validEmails } });
    }

    const validUsernames = usernames?.filter((username) => username != null);
    if (validUsernames && validUsernames?.length > 0) {
      orConditions.push({ username: { in: validUsernames } });
    }

    if (role) orConditions.push({ role });

    return prisma.author.findMany({
      include: {
        posts: true,
      },
      where: orConditions.length > 0 ? { OR: orConditions } : {},
      omit: omitFields(author),
    });
  },
  getPosts: async (
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
  ) => {
    const orConditions = [];

    const validPostIds = post_ids?.filter((id) => id != null);
    if (validPostIds && validPostIds?.length > 0) {
      orConditions.push({ post_id: { in: validPostIds } });
    }

    const validAuthorIds = author_ids?.filter((id) => id != null);
    if (validAuthorIds && validAuthorIds?.length > 0) {
      orConditions.push({ author_id: { in: validAuthorIds } });
    }

    const validTitles = titles?.filter((title) => title != null);
    if (validTitles && validTitles?.length > 0) {
      orConditions.push({ title: { in: validTitles } });
    }

    const validCategories = categories?.filter((category) => category != null);
    if (validCategories && validCategories?.length > 0) {
      orConditions.push({ categories: { hasSome: validCategories } });
    }

    if (published !== undefined) orConditions.push({ published });

    const items = await prisma.post.findMany({
      where: orConditions.length > 0 ? { OR: orConditions } : {},
      skip,
      take,
      orderBy: order_by,
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
  },
};
