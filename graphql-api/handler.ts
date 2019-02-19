import { ApolloServer, gql } from "apollo-server-lambda";
import resolvers  from "./resolvers";
import  typeDefs from "./schema";
import models  from "./mock";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    models,
    me: models.users[1],
  }),
});

module.exports.query = server.createHandler();