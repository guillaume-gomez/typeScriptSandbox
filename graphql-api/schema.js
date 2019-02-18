const { gql } = require('apollo-server-lambda');

exports.typeDefs = gql`
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
