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
            resolve: (parent, args) => {
                __1.workspaceDAO.addNewWSNode(args);
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
            resolve: (parent, args) => {
                __1.workspaceDAO.addNewConnection(args);
            }
        },
        removeConnection: {
            type: types_1.WSNodeConnectionType,
            description: "Deletes a connection between nodes.",
            resolve: (parent, args) => {
                __1.workspaceDAO.removeConnection(args);
            }
        },
    })
});
