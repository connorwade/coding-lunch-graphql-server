import express from "express"
import cors from "cors"
import { ApolloServer } from "apollo-server-express";
import resolvers from "./schema/resolvers";
import typeDefs from "./schema/typeDefs"
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";

const port = process.env.port || 4001;

async function startApolloServer() {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.use((req, res) => {
        cors();
        res.status(200);
        res.send('Hello!');
        res.end();
    })

    await new Promise(resolve => app.listen({ port: port }, resolve));
    console.log(`app listening on port ${port}`)
    return { apolloServer, app }
}

startApolloServer()
