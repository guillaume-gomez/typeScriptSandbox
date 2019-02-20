import { gql } from "apollo-server-lambda";

export default gql`
  extend type Query {
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
    messages: [Message!]
  }
`;