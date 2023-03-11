"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceDAO = void 0;
const express_1 = __importDefault(require("express"));
const schema_1 = require("./schema/schema");
const workspaces_dao_json_1 = require("./DAO/workspaces-dao-json");
require('dotenv').config();
const expressGraphQL = require('express-graphql').graphqlHTTP;
const app = (0, express_1.default)();
const port = process.env.PORT;
const dataRoute = process.env.DATAROUTE;
const workspaceDAOClass = workspaces_dao_json_1.workspacesDAOJSON;
exports.workspaceDAO = new workspaceDAOClass();
if (!port) {
    throw new Error("Failed to spin up server because port is undefined.");
}
else if (!dataRoute) {
    throw new Error("Failed to spin up server because data route is undefined.");
}
app.use(express_1.default.json());
// app.use(express.static("../static/"))
app.use("/", expressGraphQL({
    schema: schema_1.mainSchema,
    graphiql: true
}));
app.listen(port, () => console.log(`Server is listening to port ${port}`));
