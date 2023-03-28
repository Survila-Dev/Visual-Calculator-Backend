"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootQueryType = void 0;
const graphql_1 = require("graphql");
const __1 = require("..");
const types_1 = require("./types");
const userID = "12";
exports.RootQueryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    description: "Root query. It is used for retrieving the workspace from backend.",
    fields: () => ({
        currentWorkspace: {
            type: types_1.WorkspaceType,
            description: "The current workspace.",
            resolve: (parent, args, context) => {
                console.log("Got in");
                // console.log("Query triggered")
                // const accessToken = context.reqHeader.header('authorization')
                const accessToken = "0";
                // console.log(accessToken)
                // console.log("Bearer token read")
                return __1.workspaceDAO.getWholeWorkspace(accessToken);
            }
        },
    })
});
