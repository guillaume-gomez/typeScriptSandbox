const { gql } = require('apollo-server-lambda');

exports.typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    hello: String

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(text: String!): Message!
  }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;
