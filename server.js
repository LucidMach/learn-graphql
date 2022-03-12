// hello graphql
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
// for express
const { graphqlHTTP } = require("express-graphql");
const express = require("express");
// the database
const { authors, books } = require("./data");
const { type } = require("express/lib/response");

const app = express();

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "data structure of a Book in this application",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: new GraphQLNonNull(AuthorType),
      // resolve: (parent,args, ctx)=>()
      resolve: (book) => {
        return authors.find((author) => author.id === book.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "data structure of an author in this application",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "the collection of all queries defined in this API",
  fields: () => ({
    book: {
      type: BookType,
      description: "a single book in the database",
      args: {
        book_name: { type: GraphQLString },
      },
      resolve: (_, { book_name }) => {
        return books.find((book) => book.name === book_name);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      description: "list of all books in the database",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "list of all authors with books in this database",
      resolve: () => authors,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "the collection of all mutation defined in this API",
  fields: () => ({
    addBook: {
      type: new GraphQLList(BookType),
      description: "mutation to add book into the database",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, { name, authorId }) => {
        const newBook = {
          name,
          authorId,
          id: books.length + 1,
        };
        books.push(newBook);
        return books;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
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
