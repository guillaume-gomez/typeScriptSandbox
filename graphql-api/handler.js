const { ApolloServer, gql } = require('apollo-server-lambda');
const { resolvers } = require('./resolvers');
const { typeDefs } = require ('./schema');
const { users, messages } = require("./mock");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    me: users[1],
  }),
});

module.exports.query = server.createHandler();