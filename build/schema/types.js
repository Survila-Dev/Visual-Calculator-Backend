"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveConnection = exports.WorkspaceType = exports.WSNodeType = exports.PositionType = exports.WSNodeConnectionType = void 0;
const graphql_1 = require("graphql");
/**
 * A GraphQL object type which represents a connection between nodes in workspace.
 */
exports.WSNodeConnectionType = new graphql_1.GraphQLObjectType({
    name: "WSNodeConnection",
    description: "This represents a connection between workspace nodes.",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        nodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        portSelf: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        portOther: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        otherNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
    })
});
/**
 * A GraphQL object type which represents a position in 2D space.
 */
exports.PositionType = new graphql_1.GraphQLObjectType({
    name: "Position",
    description: "This represents a position in 2D space.",
    fields: () => ({
        x: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
        y: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) }
    })
});
/**
 * A GraphQL object type which represents a workspace node.
 */
exports.WSNodeType = new graphql_1.GraphQLObjectType({
    name: "WSNode",
    description: "This represents a workspace node.",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        position: { type: exports.PositionType },
        connections: { type: new graphql_1.GraphQLList(exports.WSNodeConnectionType) },
        value: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        fullyConnected: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
    })
});
/**
 * A GraphQL object type which represents a single workspace.
 */
exports.WorkspaceType = new graphql_1.GraphQLObjectType({
    name: "Workspace",
    description: "This represents a single workspace.",
    fields: () => ({
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        nodes: { type: new graphql_1.GraphQLList(exports.WSNodeType) },
        curveConnections: { type: new graphql_1.GraphQLList(exports.CurveConnection) }
    })
});
exports.CurveConnection = new graphql_1.GraphQLObjectType({
    name: "CurveConnection",
    description: "This represents a connection data type for drawing curves.",
    fields: () => ({
        firstNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        firstPortId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        secondNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        secondPortId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        firstPortPosition: { type: exports.PositionType },
        secondPortPosition: { type: exports.PositionType },
    })
});
