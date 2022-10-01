//CRUD
//Create
//Read
//Update
//Delete
import { gql } from "apollo-server-express";

export const typeDefs= gql`
    type User {
        id: Int!
        username: String!
        email: String!
        teams: [Team!]!
        password: String!
    }
    
    type Query {
        getUser(id: Int!): User!
        allUsers(id: Int!): [User!]!
    }

    type Mutation {
        createUser(username: String!, email:String!, password: String!) : User!
    }
`;