import { ApolloServer } from '@apollo/server';

// GraphQL Schema
const typeDefs: string = `type Query { info: String! }`;

const resolvers = {
    Query: {
        info: () => `This is the API of my blog`,
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));