import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLBoolean,
} from "graphql"

export interface Position2D {
    x: number,
    y: number
}

/**
 * A GraphQL object type which represents a connection between nodes in workspace.
 */
export const WSNodeConnectionType = new GraphQLObjectType ({
    name: "WSNodeConnection",
    description: "This represents a connection between workspace nodes.",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        nodeId: { type: new GraphQLNonNull(GraphQLInt) },
        portSelf: { type: new GraphQLNonNull(GraphQLInt) },
        portOther: { type: new GraphQLNonNull(GraphQLInt) },
        otherNodeId: { type: new GraphQLNonNull(GraphQLInt) }
    })
})


/**
 * A GraphQL object type which represents a position in 2D space.
 */
export const PositionType = new GraphQLObjectType({
    name: "Position",
    description: "This represents a position in 2D space.",
    fields: () => ({
        x: { type: new GraphQLNonNull(GraphQLFloat) },
        y: { type: new GraphQLNonNull(GraphQLFloat) }
    })
})

/**
 * A GraphQL object type which represents a workspace node.
 */
export const WSNodeType = new GraphQLObjectType ({
    name: "WSNode",
    description: "This represents a workspace node.",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: PositionType },
        connections: { type: new GraphQLList(WSNodeConnectionType)},
        value: { type: new GraphQLNonNull(GraphQLString)},
        fullyConnected: { type: new GraphQLNonNull(GraphQLBoolean) },
    })
})

/**
 * A GraphQL object type which represents a single workspace.
 */
export const WorkspaceType = new GraphQLObjectType({
    name: "Workspace",
    description: "This represents a single workspace.",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString)},
        id: { type: new GraphQLNonNull(GraphQLInt) },
        fullyConnected: { type: new GraphQLNonNull(WSNodeType) },
    })
})
