import { gql } from "apollo-server-express";

export const typeDefs= gql`
    type Message {
        id: Int!
        text: String!
        user: User!
        channel: Channel!
    }

    type Mutation {
        createMessage(channelId: Int!, text: String!): Boolean!
    }
`;