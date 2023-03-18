import express from "express"
import { Express } from "express"
import { mainSchema } from "./schema/schema"
import cors from "cors"
import  { graphqlHTTP } from "express-graphql"
import { workspacesDAOJSON } from "./DAO/workspaces-dao-json"
require('dotenv').config()
const expressGraphQL = require('express-graphql').graphqlHTTP

import { MongoClient } from "mongodb"
import { workspacesDAOmongoDB, workspacesDAOmongoDBClass } from "./DAO/workspaces-dao-mongoDB"

const mongoClientForApp = MongoClient;

const app: Express = express()
const port = process.env.PORT
const dataRoute: string | undefined = process.env.DATAROUTE

// const workspaceDAOClass = workspacesDAOmongoDBClass
export const workspaceDAO = workspacesDAOmongoDB

if (!port) {
    throw new Error("Failed to spin up server because port is undefined.")
} else if (!dataRoute) {
    throw new Error("Failed to spin up server because data route is undefined.")
}

app.use(cors());
app.use(express.json())
// app.use(express.static("../static/"))
app.use("/", expressGraphQL({
    schema: mainSchema,
    graphiql: true 
}))

// app.listen(port, () => console.log(`Server is listening to port ${port}`))

if (process.env.DB_URI) {

    mongoClientForApp.connect(
        process.env.DB_URI,
        {
            wtimeoutMS: 2500,
        })
        .catch(err => {
            console.error(err.stack)
            process.exit(1)
        })
        .then(async client => { 
            await workspaceDAO.injectDB(client)
            app.listen(port, () => {
                console.log(`Server is listening to port ${port}`)
            })
        })
}