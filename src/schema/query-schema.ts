import { GraphQLObjectType } from "graphql";
import { workspaceDAO } from "..";
import { WorkspaceType } from "./types";

const userID = "12"

export const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root query. It is used for retrieving the workspace from backend.",
    fields: () => ({
        currentWorkspace: {
            type: WorkspaceType,
            description: "The current workspace.",
            resolve: (parent,args,context) => {
                console.log("Got in")
                // console.log("Query triggered")
                const accessToken = context.reqHeader.header('authorization')
                // console.log(accessToken)
                // console.log("Bearer token read")
                return workspaceDAO.getWholeWorkspace(accessToken)
            }
        },
    })
})