// /* handler.js */
// const {
//   graphql,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLNonNull
// } = require('graphql')

// // This method just inserts the user's first name into the greeting message.
// const getGreeting = firstName => `Hello, ${firstName}.`

// // Here we declare the schema and resolvers for the query
// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType', // an arbitrary name
//     fields: {
//       // the query has a field called 'greeting'
//       greeting: {
//         // we need to know the user's name to greet them
//         args: { firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) } },
//         // the greeting message is a string
//         type: GraphQLString,
//         // resolve to a greeting message
//         resolve: (parent, args) => getGreeting(args.firstName)
//       }
//     }
//   }),
// })

// // We want to make a GET request with ?query=<graphql query>
// // The event properties are specific to AWS. Other providers will differ.
// module.exports.query = (event, context, callback) => graphql(schema, event.queryStringParameters.query)
//   .then(
//     result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
//     err => callback(err)
//   )

const { ApolloServer, gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    me(name: String): String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    me:(obj, args, context) => `Hello ${args.name}`
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

module.exports.query = server.createHandler();