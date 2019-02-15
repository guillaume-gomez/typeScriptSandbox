  /* handler.js */
const { ApolloServer, gql } = require('apollo-server-lambda');


// This method just inserts the user's first name into the greeting message.
const getGreeting = firstName => `Hello, dear ${firstName}.`

const typeDefs = gql`
   type Query {
    greeting(firstName: String!): String
  }
`;

const resolvers = {
  Query: {
    greeting: (firstName) => getGreeting(firstName)
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.query = server.createHandler();