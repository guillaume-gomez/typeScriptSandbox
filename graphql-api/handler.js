const { ApolloServer, gql } = require('apollo-server-lambda');

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

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    hello: String
  }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    username: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: (_obj, { id }, _context, _info) => {
      return users[id];
    },
    users: (_obj, _args, _context, _info) => {
      return Object.values(users);
    },
    me: (_obj, _args, { me }, _info) => {
      return me;
    },
    hello: () => 'Hello world!',
  },

  User: {
    username: (obj) => {
      return `${obj.firstname} ${obj.lastname}`;
    }
  }
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