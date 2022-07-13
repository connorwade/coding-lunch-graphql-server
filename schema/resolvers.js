import { businessLogic } from '../db/businessLogic'
import db from '../db/db.json'

const resolvers = {
    Query: {

        users: async (_, args) => {
            if (args.handle || args.user_id || args.email) {
                for (const user of db.users) {
                    if(user.handle === args.handle ||
                        user.user_id === args.user_id ||
                        user.email === user.email) {
                            return [user]
                        }
                }
            }
            return db.users
        },

        messages: async() => {
            return db.messages
        },

        me: async() => {
            return await businessLogic.me()
        }

    },

    Mutation: {
        addUser: async (_, req) => {
            const {handle, email, password} = req;
            
            return await businessLogic.signUp(handle, email, password);
        },

        addMessage: async (parent, { content }, ctx) => {
            return await businessLogic.addMessage(content)
        },

        login: async (_, req) => {
            const {handle, email, password} = req;

            return await businessLogic.login(handle, email, password);
        }
    }
}

export default resolvers;