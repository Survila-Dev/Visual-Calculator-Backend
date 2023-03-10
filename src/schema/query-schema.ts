//ToDo get whole workspace through query

import { GraphQLObjectType } from "graphql";
import { workspaceDAO } from "..";
import { WorkspaceType } from "./types";

export const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root query. It is used for retrieving the workspace from backend.",
    fields: () => ({
        currentWorkspace: {
            type: WorkspaceType,
            description: "The current workspace.",
            resolve: () => workspaceDAO.getWholeWorkspace()
        },
    })
})