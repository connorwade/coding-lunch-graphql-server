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
        }

    },

    Mutation: {
        addUser: async (_, req) => {
            const {handle, email, password} = req;
            
            for(const user of db.users) {
                if(user.handle === handle) {
                    console.log('User already exists by that name')
                    return;
                } else if (user.email === email) {
                    console.log("You've already signed up with that password");
                    return;
                }
            }

            //Encrypt the password here!!!

            let newUser = {
                handle: handle,
                email: email,
                password: password,
                user_id: (db.users.length + 1).toString()
            }

            db.users = [...db.users, newUser]

            return newUser
        },

        addMessage: async (parent, { content, user_id}, ctx) => {
            let sender
            for(let user of db.users) {
                sender = user.user_id === user_id ? user : undefined
            }
            if(!sender) {
                console.log("No user exists by that id")
                return;
            }

            const newMessage = {
                content: content,
                user: sender
            }

            db.messages = [...db.messages, newMessage]
            
            return newMessage
        },
    }
}

export default resolvers;