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

import { auth } from "express-oauth2-jwt-bearer";

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

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    tokenSigningAlg: 'RS256'
});

app.use(jwtCheck);
app.use(express.json())
app.set("json spaces", 2);

app.use((req, res, next) => {
    res.contentType("application/json; charset=utf-8");
    next();
  });
// app.use(nocache());

app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN_URL,
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization", "Content-Type"],
      maxAge: 86400,
    })
  );

// app.use(cors({
//     origin: ['https://localhost:3000/', 'https://localhost:4000/', 'https://localhost:3000', 'https://localhost:4000' ]
// }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Content-type", 'application/json')
//     next();
//   });

// app.use(cors({
//     'allowedHeaders': ['Content-Type'],
//     'origin': '*',
//     'preflightContinue': true
//   }))

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.use("/", expressGraphQL((req: any) => {
//     return ({
//         schema: mainSchema,
//         graphiql: true,
//         context: {reqHeader: req}
//     })
// }))

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
                console.log(`This server is listening to port ${port}`)
            })
        })
}