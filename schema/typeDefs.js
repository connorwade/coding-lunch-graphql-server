import { gql } from "apollo-server-express";

const typeDefs = gql`
    type User {
        handle: String!
        email: String!
        password: String!
        user_id: String!
    }

    type Message {
        content: String
        user: User
    }

    type Query {
        users(handle: String, email: String, user_id: String): [User]
        messages: [Message]
        me: User
    }

    type Mutation {
        addUser(handle: String!, email: String!, password: String!): User
        addMessage(content: String!):Message
        login(handle: String, email: String, password: String!): User
    }
`

export default typeDefs