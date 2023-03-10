"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schema_1 = require("./schema/schema");
const express_graphql_1 = require("express-graphql");
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const dataRoute = process.env.DATAROUTE;
if (!port) {
    throw new Error("Failed to spin up server because port is undefined.");
}
else if (!dataRoute) {
    throw new Error("Failed to spin up server because data route is undefined.");
}
app.use(express_1.default.json());
app.use(express_1.default.static("../static/"));
app.use(dataRoute, (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.mainSchema,
    graphiql: true
}));
app.listen(() => console.log(`Server is listening to port ${port}`));
