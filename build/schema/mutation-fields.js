"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationQueryType = exports.PositionType2 = void 0;
const graphql_1 = require("graphql");
const __1 = require("..");
const input_types_1 = require("./input-types");
const types_1 = require("./types");
const userID = "12";
exports.PositionType2 = new graphql_1.GraphQLObjectType({
    name: "Position",
    description: "This represents a position in 2D space.",
    fields: () => ({
        x: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
        y: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) }
    })
});
exports.MutationQueryType = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    description: "Mutation query. It is used for updating the workspace.",
    fields: () => ({
        updateWholeWorkspace: {
            type: types_1.WorkspaceType,
            description: "Updates the whole workspace at once. The argument is stringified workspace object.",
            args: {
                workspace: { type: input_types_1.WorkspaceInputType }
            },
            resolve: (parent, args) => {
                __1.workspaceDAO.updateWholeWorkspace(userID, args.workspace);
            }
        },
        // updateNodePosition: {
        //     type: WSNodeConnectionType,
        //     description: "Updates the position of workspace node.",
        //     args: {
        //         nodeId: { type: new GraphQLNonNull(GraphQLInt) },
        //         x: { type: new GraphQLNonNull(GraphQLFloat) },
        //         y: { type: new GraphQLNonNull(GraphQLFloat) },
        //     },
        //     resolve: (parent: any, args) => {
        //         workspaceDAO.updateWSNodePosition(args.nodeId, {x: args.x, y: args.y})
        //     }
        // },
        // addNode: {
        //     type: WSNodeType,
        //     description: "Adds a node to workspace.",
        //     args: {
        //         id: { type: new GraphQLNonNull(GraphQLInt) },
        //         x: { type: new GraphQLNonNull(GraphQLFloat) },
        //         y: { type: new GraphQLNonNull(GraphQLFloat) },
        //         type: { type: new GraphQLNonNull(GraphQLString) },
        //         value: { type: new GraphQLNonNull(GraphQLFloat) },
        //     },
        //     resolve: (parent: any, args: any) => {
        //         workspaceDAO.addNewWSNode({
        //             id: args.id,
        //             position: {x: args.x, y: args.y},
        //             type: args.type,
        //             value: args.value
        //         })
        //     }
        // },
        // removeNode: {
        //     type: WSNodeType,
        //     description: "Deletes a node from workspace.",
        //     resolve: (parent: any, args: {nodeId: number}) => {
        //         workspaceDAO.removeWSNode(args.nodeId)
        //     }
        // },
        // addConnection: {
        //     type: WSNodeConnectionType,
        //     description: "Adds new connection between nodes.",
        //     args: {
        //         firstNodeId: { type: new GraphQLNonNull(GraphQLInt) },
        //         firstPortId: { type: new GraphQLNonNull(GraphQLInt) },
        //         secondNodeId: { type: new GraphQLNonNull(GraphQLInt) },
        //         secondPortId: { type: new GraphQLNonNull(GraphQLInt) },
        //     },
        //     resolve: (parent: any, args: any) => {
        //         workspaceDAO.addNewConnection({
        //             firstNodeId: args.firstNodeId,
        //             firstPortId: args.firstPortId,
        //             secondNodeId: args.secondNodeId,
        //             secondPortId: args.secondPortId
        //         })
        //     }
        // },
        // removeConnection: {
        //     type: WSNodeConnectionType,
        //     description: "Deletes a connection between nodes.",
        //     args: {
        //         firstNodeId: { type: new GraphQLNonNull(GraphQLInt) },
        //         firstPortId: { type: new GraphQLNonNull(GraphQLInt) },
        //         secondNodeId: { type: new GraphQLNonNull(GraphQLInt) },
        //         secondPortId: { type: new GraphQLNonNull(GraphQLInt) },
        //     },
        //     resolve: (parent: any, args: any) => {
        //         workspaceDAO.removeConnection({
        //             firstNodeId: args.firstNodeId,
        //             firstPortId: args.firstPortId,
        //             secondNodeId: args.secondNodeId,
        //             secondPortId: args.secondPortId
        //         })
        //     }
        // },
    })
});
