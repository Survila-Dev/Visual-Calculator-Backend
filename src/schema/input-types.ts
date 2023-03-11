import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"

export const WorkspaceInputType = new GraphQLInputObjectType({
    name: "WorkspaceInput",
    description: "This represents a single workspace input type.",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) } ,
        id: { type: new GraphQLNonNull(GraphQLInt) },
        nodes: { type: new GraphQLList(WSNodeInputType) },
    }),
    
})

export const WSNodeInputType = new GraphQLInputObjectType ({
    name: "WSNodeInput",
    description: "This represents a workspace node.",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: PositionInputType },
        connections: { type: new GraphQLList(WSNodeConnectionInputType)},
        value: { type: new GraphQLNonNull(GraphQLString)},
        fullyConnected: { type: new GraphQLNonNull(GraphQLBoolean) },
    })
})

export const WSNodeConnectionInputType = new GraphQLInputObjectType ({
    name: "WSNodeConnectionInput",
    description: "This represents a connection between workspace nodes.",
    fields: () => ({
        // id: { type: new GraphQLNonNull(GraphQLInt) },
        // nodeId: { type: new GraphQLNonNull(GraphQLInt) },
        portSelf: { type: new GraphQLNonNull(GraphQLInt) },
        portOther: { type: new GraphQLNonNull(GraphQLInt) },
        otherNodeId: { type: new GraphQLNonNull(GraphQLInt) }
    })
})

export const PositionInputType = new GraphQLInputObjectType({
    name: "PositionInput",
    description: "This represents a position in 2D space.",
    fields: () => ({
        x: { type: new GraphQLNonNull(GraphQLFloat) },
        y: { type: new GraphQLNonNull(GraphQLFloat) }
    })
})