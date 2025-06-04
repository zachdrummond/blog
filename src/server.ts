import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

import { getUserID } from "./utils.js";

// GraphQL Resolvers = A collection of functions that fetch the data for the schema
// parent = Result of previous resolver execution level
const resolvers = {
  Query: {
    getAllPosts: (parent, args, { prisma }) => {
      return prisma.post.findMany();
    },
    getPosts: (parent, { ids, titles, categories }, { prisma }) => {
      if (
        (!ids && !titles && !categories) ||
        ids?.length === 0 ||
        titles?.length === 0 ||
        categories?.length === 0
      ) {
        throw new Error("Either ID, title, or category must be provided.");
      }

      // Convert string IDs to integers
      const parsedIds = ids ? ids.map((id) => parseInt(id, 10)) : [];

      const new_post_list = prisma.post.findMany({
        where: {
          OR: [
            { id: { in: parsedIds } },
            { title: { in: titles ? titles : [] } },
            { categories: { hasSome: categories ? categories : [] } },
          ],
        },
      });

      return new_post_list;
    },
  },
  Mutation: {
    addPost: (parent, { title, content, categories, published }, { prisma }) => {
      if (!title || !content || !categories)
        throw new Error("Title, content, and categories are required.");

      let current_date = new Date();
      const newPost = prisma.post.create({
        data: {
          createdAt: current_date,
          updatedAt: current_date,
          title,
          content,
          categories: categories ? categories : [],
          published: published || false,
        },
      });

      return newPost;
    },
    deletePost: (parent, { id, title }, { prisma }) => {
      if (!id && !title)
        throw new Error("Either ID or title must be provided.");

      return prisma.post
        .delete({
          where: {
            id: id ? parseInt(id, 10) : undefined,
          },
        })
        .catch((error) => {
          throw new Error(`Error deleting post: ${error.message}`);
        });
    },
    updatePost: (
      parent,
      { id, title, content, categories, published },
      { prisma }
    ) => {
      if (!id) throw new Error("ID is required.");
      if (
        title === undefined &&
        content === undefined &&
        (categories === undefined || categories?.length === 0) &&
        published === undefined
      )
        throw new Error("At least one field must be provided for update.");

      return prisma.post
        .update({
          where: {
            id: parseInt(id, 10),
          },
          data: {
            title: title ? title : undefined,
            content: content ? content : undefined,
            categories: categories?.length > 0 ? categories : undefined,
            published: published !== undefined ? published : undefined,
          },
        })
        .catch((error) => {
          throw new Error(`Error updating post: ${error.message}`);
        });
    },
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Exposes CRUD API for data models
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const server = new ApolloServer({
  typeDefs: fs.readFileSync(join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

// 1. Creates an Express app 2. Installs ApolloServer as middleware 3. Preps app to handle incoming requests
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      return {
        ...req,
        prisma,
        userID: req && req.headers.authorization ? await getUserID(req) : null,
      };
    },
  });
  console.log(`🚀  Server ready at ${url}`);
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
