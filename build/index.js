"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceDAO = void 0;
const express_1 = __importDefault(require("express"));
const schema_1 = require("./schema/schema");
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const expressGraphQL = require('express-graphql').graphqlHTTP;
const mongodb_1 = require("mongodb");
const workspaces_dao_mongoDB_1 = require("./DAO/workspaces-dao-mongoDB");
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const mongoClientForApp = mongodb_1.MongoClient;
const app = (0, express_1.default)();
const port = process.env.PORT;
const dataRoute = process.env.DATAROUTE;
// const workspaceDAOClass = workspacesDAOmongoDBClass
exports.workspaceDAO = workspaces_dao_mongoDB_1.workspacesDAOmongoDB;
if (!port) {
    throw new Error("Failed to spin up server because port is undefined.");
}
else if (!dataRoute) {
    throw new Error("Failed to spin up server because data route is undefined.");
}
console.log(process.env.AUTH0_AUDIENCE);
// dotenv.config()
const jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    audience: process.env.AUTH0_AUDIENCE,
});
app.use(jwtCheck);
app.use((0, cors_1.default)({
    origin: 'https://localhost:3000/'
}));
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://localhost:3000/");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/", (req, res) => expressGraphQL({
    schema: schema_1.mainSchema,
    graphiql: true,
    context: { reqHeader: req.header }
}));
// app.listen(port, () => console.log(`Server is listening to port ${port}`))
if (process.env.DB_URI) {
    mongoClientForApp.connect(process.env.DB_URI, {
        wtimeoutMS: 2500,
    })
        .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
        .then((client) => __awaiter(void 0, void 0, void 0, function* () {
        yield exports.workspaceDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`Server is listening to port ${port}`);
        });
    }));
}
