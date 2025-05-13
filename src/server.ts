import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import path from "path";

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
      const post = {
        id: `post-${count++}`,
        content: args.content,
        createdAt: new Date().toLocaleString(),
        title: args.title,
        published: args.published,
      };

      post_list.push(post);
      return post;
    },
    deletePost: (parent, args) => {},
    updatePost: (parent, args) => {},
  },
  Post: {
    id: (parent) => parent.id,
    createdAt: (parent) => parent.createdAt,
    updatedAt: (parent) => parent.updatedAt,
    title: (parent) => parent.title,
    content: (parent) => parent.content,
    published: (parent) => parent.published,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

// 1. Creates an Express app 2. Installs ApolloServer as middleware 3. Preps app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
