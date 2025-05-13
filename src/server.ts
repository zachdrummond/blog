import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Data
let post_list = [
  {
    id: "post-1",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
    title: "GraphQL 101",
    content: "Introduction to GraphQL",
    published: true,
  },
  {
    id: "post-2",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
    title: "Test Title",
    content: "Test Content",
    published: false,
  },
];

// GraphQL Resolvers = A collection of functions that fetch the data for the schema
// parent = Result of previous resolver execution level
const resolvers = {
  Query: {
    info: () => `This is the API of my blog`,
    feed: () => post_list,
  },
  Mutation: {
    addPost: (parent, args) => {
      let count = post_list.length;
      let current_date = new Date().toLocaleString();
      const post = {
        id: `post-${count++}`,
        content: args.content,
        createdAt: current_date,
        title: args.title,
        published: args.published,
        updatedAt: current_date,
      };

      post_list.push(post);
      return post;
    },
    deletePost: (parent, args): boolean => {
      for (let i = 0; i < post_list.length; i++) {
        if (post_list[i].id === args.id || post_list[i].title === args.title) {
          post_list.splice(i, 1);
          return true;
        }
      }
      return false;
    },
    updatePost: (parent, args) => {
      for (let i = 0; i < post_list.length; i++) {
        if (post_list[i].id === args.id) {
          if (args.title) post_list[i].title = args.title;
          if (args.content) post_list[i].content = args.content;
          if (args.published) post_list[i].published = args.published;
          post_list[i].updatedAt = new Date().toLocaleString();
        }
        return post_list[i];
      }
    },
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = new ApolloServer({
  typeDefs: fs.readFileSync(join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

// 1. Creates an Express app 2. Installs ApolloServer as middleware 3. Preps app to handle incoming requests
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
