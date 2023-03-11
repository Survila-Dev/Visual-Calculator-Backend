import { GraphQLObjectType } from "graphql";
import { workspaceDAO } from "..";
import { IWSNodeConnection, IWSNodeDatabase, Position2D } from "../DAO/workspaces-dao-type";
import { WSNodeConnectionType, WSNodeType } from "./types";

export const MutationQueryType = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation query. It is used for updating the workspace.",
    fields: () => ({
        updateNodePosition: {
            type: WSNodeConnectionType,
            description: "Updates the position of workspace node.",
            resolve: (parent: any, args: {nodeId: number, newPosition: Position2D}) => {
                workspaceDAO.updateWSNodePosition(args.nodeId, args.newPosition)
            }
        },
        addNode: {
            type: WSNodeType,
            description: "Adds a node to workspace.",
            resolve: (parent: any, args: IWSNodeDatabase) => {
                workspaceDAO.addNewWSNode(args)
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
            resolve: (parent: any, args: IWSNodeConnection) => {
                workspaceDAO.addNewConnection(args)
            }
        },
        removeConnection: {
            type: WSNodeConnectionType,
            description: "Deletes a connection between nodes.",
            resolve: (parent: any, args: IWSNodeConnection) => {
                workspaceDAO.removeConnection(args)
            }
        },
    })
})