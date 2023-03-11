"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationQueryType = exports.PositionType2 = void 0;
const graphql_1 = require("graphql");
const __1 = require("..");
const types_1 = require("./types");
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
                workspace: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve: (parent, args) => {
                __1.workspaceDAO.updateWholeWorkspace(JSON.parse(args.workspace));
            }
        },
        updateNodePosition: {
            type: types_1.WSNodeConnectionType,
            description: "Updates the position of workspace node.",
            args: {
                nodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                x: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
                y: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
            },
            resolve: (parent, args) => {
                __1.workspaceDAO.updateWSNodePosition(args.nodeId, { x: args.x, y: args.y });
            }
        },
        addNode: {
            type: types_1.WSNodeType,
            description: "Adds a node to workspace.",
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                x: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
                y: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
                type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                value: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
            },
            resolve: (parent, args) => {
                __1.workspaceDAO.addNewWSNode({
                    id: args.id,
                    position: { x: args.x, y: args.y },
                    type: args.type,
                    value: args.value
                });
            }
        },
        removeNode: {
            type: types_1.WSNodeType,
            description: "Deletes a node from workspace.",
            resolve: (parent, args) => {
                __1.workspaceDAO.removeWSNode(args.nodeId);
            }
        },
        addConnection: {
            type: types_1.WSNodeConnectionType,
            description: "Adds new connection between nodes.",
            args: {
                firstNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                firstPortId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                secondNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                secondPortId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve: (parent, args) => {
                __1.workspaceDAO.addNewConnection({
                    firstNodeId: args.firstNodeId,
                    firstPortId: args.firstPortId,
                    secondNodeId: args.secondNodeId,
                    secondPortId: args.secondPortId
                });
            }
        },
        removeConnection: {
            type: types_1.WSNodeConnectionType,
            description: "Deletes a connection between nodes.",
            args: {
                firstNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                firstPortId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                secondNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                secondPortId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve: (parent, args) => {
                __1.workspaceDAO.removeConnection({
                    firstNodeId: args.firstNodeId,
                    firstPortId: args.firstPortId,
                    secondNodeId: args.secondNodeId,
                    secondPortId: args.secondPortId
                });
            }
        },
    })
});
