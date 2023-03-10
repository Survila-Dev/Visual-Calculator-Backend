import { GraphQLObjectType } from "graphql";

export const MutationQueryType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root query. It is used for retrieving the workspace from backend.",
    fields: () => ({
        updateNodePosition: {},
        addNode: {},
        removeNode: {},
        addConnection: {},
        removeConnection: {},
    })
})