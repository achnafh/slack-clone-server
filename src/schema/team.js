import { gql } from "apollo-server-express";

export const typeDefs= gql`
    type Team {
        owner: User!
        members: [User!]!
        channels: [Channel!]!
    }

    type Query 

    type Mutation {
        createTeam(name: String!): Boolean!
    }
    
`;