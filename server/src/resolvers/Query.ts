import { QueryResolvers } from "../../shared/types.js";
import { omitFields } from "../utils.js";

export const queries: QueryResolvers = {
  getAuthors: (
    parent,
    { author_ids, emails, role, usernames },
    { prisma, author }
  ) => {
    if ((role || (emails?.length ?? 0) > 0) && author?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const validAuthorIds = author_ids?.filter(id => id != null);
    const validEmails = emails?.filter(email => email != null);
    const validUsernames = usernames?.filter(username => username != null);

    return prisma.author.findMany({
      include: {
        posts: true,
      },
      where: {
        OR: [
          { author_id: { in: validAuthorIds } },
          { email: { in: validEmails } },
          { username: { in: validUsernames } },
          { role }
        ]
      },
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

    const validPostIds = post_ids?.filter(post_id => post_id != null);
    const validAuthorIds = author_ids?.filter(id => id != null);
    const validTitles = titles?.filter(title => title != null);
    const validCategories = categories?.filter(category => category != null);

    const items = await prisma.post.findMany({
      where: {
        OR: [
          { post_id: { in: validPostIds }},
          { author_id: { in: validAuthorIds }},
          { title: { in: validTitles } },
          { categories: { hasSome: validCategories } },
          { published: published },
        ]
      },
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
