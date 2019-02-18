const { ApolloServer, gql } = require('apollo-server-lambda');
const { resolvers } = require('./resolvers');
const { typeDefs } = require ('./schema');

let users = {
  1: {
    id: '1',
    firstname: 'Robin',
    lastname: 'Wieruch',
  },
  2: {
    id: '2',
    firstname: 'Dave',
    lastname: 'Davids',
  },
};

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