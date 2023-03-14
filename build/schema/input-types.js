"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveConnectionInput = exports.PositionInputType = exports.WSNodeConnectionInputType = exports.WSNodeInputType = exports.WorkspaceInputType = void 0;
const graphql_1 = require("graphql");
exports.WorkspaceInputType = new graphql_1.GraphQLInputObjectType({
    name: "WorkspaceInput",
    description: "This represents a single workspace input type.",
    fields: () => ({
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        nodes: { type: new graphql_1.GraphQLList(exports.WSNodeInputType) },
        curveConnections: { type: new graphql_1.GraphQLList(exports.CurveConnectionInput) },
        fieldPosition: { type: exports.PositionInputType }
    }),
});
exports.WSNodeInputType = new graphql_1.GraphQLInputObjectType({
    name: "WSNodeInput",
    description: "This represents a workspace node.",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        position: { type: exports.PositionInputType },
        connections: { type: new graphql_1.GraphQLList(exports.WSNodeConnectionInputType) },
        value: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        fullyConnected: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLBoolean) },
    })
});
exports.WSNodeConnectionInputType = new graphql_1.GraphQLInputObjectType({
    name: "WSNodeConnectionInput",
    description: "This represents a connection between workspace nodes.",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        nodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        portSelf: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        portOther: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        otherNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
    })
});
exports.PositionInputType = new graphql_1.GraphQLInputObjectType({
    name: "PositionInput",
    description: "This represents a position in 2D space.",
    fields: () => ({
        x: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
        y: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) }
    })
});
exports.CurveConnectionInput = new graphql_1.GraphQLInputObjectType({
    name: "CurveConnectionInput",
    description: "This represents a connection data type for drawing curves.",
    fields: () => ({
        firstNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        firstPortId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        secondNodeId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        secondPortId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        firstPortPosition: { type: exports.PositionInputType },
        secondPortPosition: { type: exports.PositionInputType },
    })
});
