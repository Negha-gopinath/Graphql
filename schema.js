const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    hobbies: [Hobby]
  }

  type Hobby {
    id: ID!
    name: String!
    description: String
    users: [User]
  }
  type Query {
    users: [User]
    user(id: ID!): User
    hobbies: [Hobby]
  }

  type Mutation {
    createUser(name: String!, email: String!, hobbyNames: [String!]!): User
    updateUser(id: ID!, name: String, email: String, hobbyNames: [String!]): User
    deleteUser(id: ID!): User
    createHobby(name: String!,description:String): Hobby
  }


`;
module.exports = typeDefs;
