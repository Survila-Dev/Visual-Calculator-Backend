import express from "express"
import { Express } from "express"
import { mainSchema } from "./schema/schema"
import  { graphqlHTTP } from "express-graphql"
import { workspacesDAOJSON } from "./DAO/workspaces-dao-json"
require('dotenv').config()
const expressGraphQL = require('express-graphql').graphqlHTTP

const app: Express = express()
const port = process.env.PORT
const dataRoute: string | undefined = process.env.DATAROUTE

const workspaceDAOClass = workspacesDAOJSON
export const workspaceDAO = new workspaceDAOClass()

if (!port) {
    throw new Error("Failed to spin up server because port is undefined.")
} else if (!dataRoute) {
    throw new Error("Failed to spin up server because data route is undefined.")
}

app.use(express.json())
// app.use(express.static("../static/"))
app.use("/", expressGraphQL({
    schema: mainSchema,
    graphiql: true 
}))

app.listen(port, () => console.log(`Server is listening to port ${port}`))

