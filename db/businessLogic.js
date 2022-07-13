import db from './db.json'

let currentUser

export const businessLogic = {

    login: async (handle, email, password) => {
        if(handle || email) {
            for (const user of db.users) {
                if(user.handle === handle ||
                    user.email === email &&
                    user.password === password) {
                        currentUser = user
                        return user
                } else {
                    console.log("You did something wrong")
                    return;
                }
            }
        } else {
            console.log("You didn't provide an email or handle")
            return;
        }
    },

    signUp: async (handle, email, password) => {
            
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

            currentUser = newUser
            return newUser
    },

    addMessage: async (content) => {
        if(await authorized(currentUser)) {
            const newMessage = {
                content: content,
                user: currentUser
            }

            db.messages = [...db.messages, newMessage]
            return db.messages
        }
        else {
            console.log("you are not authorized")
            return;
        }
    },

    me: async () => {
        return currentUser
    }
}

const authorized = async (currentUser) => {
    if(currentUser) {
        return true
    }
    return false
}