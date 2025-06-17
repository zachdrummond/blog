import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

import { getAuthorID } from "./utils.js";
import { Author, Date, Query, Mutation, Post } from "./resolvers/index.js";

// GraphQL Resolvers = A collection of functions that fetch the data for the schema
// parent = Result of previous resolver execution level
const resolvers = {
  Query,
  Mutation,
  Author: {
    ...Author,
    createdAt: Date.createdAt,
    updatedAt: Date.updatedAt,
  },
  Post: {
    ...Post,
    createdAt: Date.createdAt,
    updatedAt: Date.updatedAt,
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
        authorID:
          req && req.headers.authorization ? await getAuthorID(req) : null,
      };
    },
  });
  console.log(`🚀  Server ready at ${url}`);
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
