const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const app = express();

// a schema in gQL has 3 kinds of operations: query, mutation, subscription, and the body of each operation is an object... so we create types
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "helloWorld",
    description: "ultra basic graphQL query, returns world for hello",
    fields: () => ({
      hello: {
        type: GraphQLString,
        resolve: () => "world!",
      },
    }),
  }),
});

// a graphQL request can be made as a POST/OPTIONS so we use express.use() for simplicity sake
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("listening..."));
