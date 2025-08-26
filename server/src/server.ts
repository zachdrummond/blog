import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

import { getAuthor } from "./utils.js";
import { resolvers } from "./resolvers/resolvers.js";
import { Author } from "../shared/types.js";

export interface GraphQLContext {
  prisma: PrismaClient;
  author: Author;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Exposes CRUD API for data models
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const server = new ApolloServer<GraphQLContext>({
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
        author: await getAuthor(req),
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
