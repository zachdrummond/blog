import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// GraphQL Schema = A collection of type definitions
const typeDefs: string = `#graphql
type Query {
    feed: [Post!]!
    info: String!
}

type Post {
  id: ID!
  content: String!
  createdAt: String!
  published: Boolean!
  title: String!
  updatedAt: String!
}
`;

// Data
let posts = [{
  id: "post-1",
  createdAt: new Date().toLocaleString(),
  updatedAt: new Date().toLocaleString(),
  title: "GraphQL 101",
  content: "Introduction to GraphQL",
  published: true,
}];

// GraphQL Resolvers = A collection of functions that fetch the data for the schema
// parent = Result of previous resolver execution level
const resolvers = {
  Query: {
    info: () => `This is the API of my blog`,
    feed: () => posts,
  },
  Post: {
    id: (parent) => parent.id,
    createdAt: (parent) => parent.createdAt,
    updatedAt: (parent) => parent.updatedAt,
    title: (parent) => parent.title,
    content: (parent) => parent.content,
    published: (parent) => parent.published,
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 1. Creates an Express app 2. Installs ApolloServer as middleware 3. Preps app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
