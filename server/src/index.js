const fs = require("fs");
const { gql, ApolloServer } = require("apollo-server");

const data = fs.readFileSync(`${__dirname}/data.json`);
const contacts = JSON.parse(data);

const typeDefs = gql`
  "all read operations in this graphql API"
  type Query {
    "returns all the contacts that have been created"
    contacts: [Contact!]!
  }
  "all the create, update, delete operations in the graphql API "
  type Mutation {
    "create a new contact"
    createContact(
      firstName: String
      lastName: String
      email: String
      avatar: String
    ): Contact
  }

  type Contact {
    "unique ID for each contact"
    id: ID!
    "the first name of the contact"
    firstName: String
    "the last name of the contact"
    lastName: String
    "the email address of the contact"
    email: String
    "the profile picture url of the contact"
    avatar: String
  }
`;

const resolvers = {
  Query: {
    contacts: () => contacts,
  },
  Mutation: {
    createContact: (_, { firstName, lastName, email, avatar }) => {
      const contact = {
        id: Math.floor(100 * Math.random()),
        firstName,
        lastName,
        email,
        avatar,
      };
      contacts.push(contact);
      fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(contacts));
      return contact;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(url));
