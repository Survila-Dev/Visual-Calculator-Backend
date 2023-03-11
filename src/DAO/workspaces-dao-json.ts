import { IWorkspacesDAO, Workspace, IWSNodeConnection, IWSNodeDatabase, Position2D } from "./workspaces-dao-type";
import { promises as fs } from "fs"

const jsonFileName = "dummyDatabase.json"

/**
 * A dummy DAO which saves and updates the data to JSON.
 */
export class workspacesDAOJSON extends IWorkspacesDAO {
    
    async getWholeWorkspace(): Promise<Workspace> {
        const data = await fs.readFile(jsonFileName, "utf8")
        const workspace = JSON.parse(data)
        console.log(workspace.name)
        return workspace
    }

    async injectDB(): Promise<void> {
        
    }

    async addNewConnection(connection: IWSNodeConnection): Promise<void> {
        // Create new connection and add it to both nodes
        
    }

    async removeConnection(connection: IWSNodeConnection): Promise<void> {
        // Remove the connection from both nodes
        
    }

    async addNewWSNode(node: IWSNodeDatabase): Promise<void> {
        // Append new ws node to the workspace object.
        
    }

    async removeWSNode(nodeId: number): Promise<void> {
        // Remove the connections between the to be deleted node
        
        // Remove the node itself
        
    }

    async updateWSNodePosition(nodeId: number, newPosition: Position2D): Promise<void> {
        // Update the position of single ws node

        return
    }

}