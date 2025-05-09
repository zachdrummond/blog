import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// GraphQL Schema = A collection of type definitions
const typeDefs: string = `#graphql
type Query {
    info: String!
}
`;
// GraphQL Resolvers = A collection of functions that fetch the data for the schema
const resolvers = {
  Query: {
    info: () => `This is the API of my blog`,
  },
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
