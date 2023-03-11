import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { workspaceDAO } from "..";
import { WorkspaceType, WSNodeConnectionType, WSNodeType } from "./types";

export const PositionType2 = new GraphQLObjectType({
    name: "Position",
    description: "This represents a position in 2D space.",
    fields: () => ({
        x: { type: new GraphQLNonNull(GraphQLFloat) },
        y: { type: new GraphQLNonNull(GraphQLFloat) }
    })
})

export const MutationQueryType = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation query. It is used for updating the workspace.",
    fields: () => ({
        updateWholeWorkspace: {
            type: WorkspaceType,
            description: "Updates the whole workspace at once. The argument is stringified workspace object.",
            args: {
                workspace: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent: any, args: any) => {
                workspaceDAO.updateWholeWorkspace(JSON.parse(args.workspace))
            }
        },

        updateNodePosition: {
            type: WSNodeConnectionType,
            description: "Updates the position of workspace node.",
            args: {
                nodeId: { type: new GraphQLNonNull(GraphQLInt) },
                x: { type: new GraphQLNonNull(GraphQLFloat) },
                y: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            resolve: (parent: any, args) => {
                workspaceDAO.updateWSNodePosition(args.nodeId, {x: args.x, y: args.y})
            }
        },

        addNode: {
            type: WSNodeType,
            description: "Adds a node to workspace.",
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                x: { type: new GraphQLNonNull(GraphQLFloat) },
                y: { type: new GraphQLNonNull(GraphQLFloat) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                value: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            resolve: (parent: any, args: any) => {
                workspaceDAO.addNewWSNode({
                    id: args.id,
                    position: {x: args.x, y: args.y},
                    type: args.type,
                    value: args.value
                })
            }
        },

        removeNode: {
            type: WSNodeType,
            description: "Deletes a node from workspace.",
            resolve: (parent: any, args: {nodeId: number}) => {
                workspaceDAO.removeWSNode(args.nodeId)
            }
        },

        addConnection: {
            type: WSNodeConnectionType,
            description: "Adds new connection between nodes.",
            args: {
                firstNodeId: { type: new GraphQLNonNull(GraphQLInt) },
                firstPortId: { type: new GraphQLNonNull(GraphQLInt) },
                secondNodeId: { type: new GraphQLNonNull(GraphQLInt) },
                secondPortId: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent: any, args: any) => {
                workspaceDAO.addNewConnection({
                    firstNodeId: args.firstNodeId,
                    firstPortId: args.firstPortId,
                    secondNodeId: args.secondNodeId,
                    secondPortId: args.secondPortId
                })
            }
        },

        removeConnection: {
            type: WSNodeConnectionType,
            description: "Deletes a connection between nodes.",
            args: {
                firstNodeId: { type: new GraphQLNonNull(GraphQLInt) },
                firstPortId: { type: new GraphQLNonNull(GraphQLInt) },
                secondNodeId: { type: new GraphQLNonNull(GraphQLInt) },
                secondPortId: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent: any, args: any) => {
                workspaceDAO.removeConnection({
                    firstNodeId: args.firstNodeId,
                    firstPortId: args.firstPortId,
                    secondNodeId: args.secondNodeId,
                    secondPortId: args.secondPortId
                })
            }
        },
    })
})