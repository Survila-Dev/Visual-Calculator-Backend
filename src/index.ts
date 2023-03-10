import express from "express"
import { Express } from "express"
import { mainSchema } from "./schema/schema"
import  { graphqlHTTP } from "express-graphql"
require('dotenv').config()

const app: Express = express()
const port = process.env.PORT
const dataRoute: string | undefined = process.env.DATAROUTE

if (!port) {
    throw new Error("Failed to spin up server because port is undefined.")
} else if (!dataRoute) {
    throw new Error("Failed to spin up server because data route is undefined.")
}

app.use(express.json())
app.use(express.static("../static/"))
app.use(dataRoute, graphqlHTTP({
    schema: mainSchema,
    graphiql: true 
}))
app.listen(() => console.log(`Server is listening to port ${port}`))

