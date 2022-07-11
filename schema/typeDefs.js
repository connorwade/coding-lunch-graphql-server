import { gql } from "apollo-server-express";

const typeDefs = gql`
    type User {
        handle: String!
        email: String!
        password: String!
        user_id: String!
    }

    type Query {
        users(handle: String, email: String, user_id: String): [User]
    }

    type Mutation {
        addUser(handle: String!, email: String!, password: String!): User
    }
`

export default typeDefs