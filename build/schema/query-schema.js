"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootQueryType = void 0;
const graphql_1 = require("graphql");
const __1 = require("..");
const types_1 = require("./types");
exports.RootQueryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    description: "Root query. It is used for retrieving the workspace from backend.",
    fields: () => ({
        currentWorkspace: {
            type: types_1.WorkspaceType,
            description: "The current workspace.",
            resolve: () => __1.workspaceDAO.getWholeWorkspace()
        },
    })
});
