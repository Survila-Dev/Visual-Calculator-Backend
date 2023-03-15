import { IWorkspacesDAO, Workspace, IWSNodeConnection, IWSNodeDatabase, Position2D } from "./workspaces-dao-type";
import { promises as fs } from "fs"

const jsonFileName = "src/DAO/dummyDatabase.json"

const _id = "1"

const readAlterWrite = async (callback: (Workspace: Workspace) => Workspace) => {
    const data = await fs.readFile(jsonFileName, "utf8")
    const workspace = JSON.parse(data)
    // const dbValue = JSON.parse(data)
    // const workspace = dbValue.workspace

    const alteredWorkspace = callback(workspace)

    // const writeDBValue = {
    //     _id: _id,
    //     workspace: alteredWorkspace
    // }
    await fs.writeFile(jsonFileName, JSON.stringify(alteredWorkspace))
}

/**
 * A dummy DAO which saves and updates the data to JSON.
 */
export class workspacesDAOJSON extends IWorkspacesDAO {
    
    async injectDB(): Promise<void> {
        console.log("Place holder for database inject subroutine.")
    }

    async getWholeWorkspace(): Promise<Workspace> {
        console.log("Overwriting workspace from backend.")
        const data = await fs.readFile(jsonFileName, "utf8")
        const workspace = JSON.parse(data)
        // const workspace = dbValue.workspace
        return workspace
    }
    
    async updateWSNodePosition(nodeId: number, newPosition: Position2D): Promise<void> {
        readAlterWrite((curWorkspace) => {
            curWorkspace.nodes[nodeId].position = newPosition
            return curWorkspace
        })
    }

    async updateWholeWorkspace(newWorkspace: Workspace): Promise<void> {
        console.log("Updating the workspace.")
        readAlterWrite((curWorksapce) => {
            return newWorkspace
        })
    }

    async addNewConnection(connection: IWSNodeConnection): Promise<void> {
        throw new Error("Not implemented.")
        // readAlterWrite((curWorkspace) => {
            
        //     curWorkspace.nodes[connection.firstNodeId].connections.push({
        //         otherNodeId: curWorkspace.nodes[connection.secondNodeId].id,
        //         portOther: connection.secondPortId,
        //         portSelf: connection.firstPortId
        //     })
            
        //     curWorkspace.nodes[connection.secondNodeId].connections.push({
        //         otherNodeId: curWorkspace.nodes[connection.firstNodeId].id,
        //         portOther: connection.firstPortId,
        //         portSelf: connection.secondPortId
        //     })
            
        //     return curWorkspace
            
        // })
        
    }

    async removeConnection(connection: IWSNodeConnection): Promise<void> {
        throw new Error("Not implemented.")
    }

    async addNewWSNode(node: IWSNodeDatabase): Promise<void> {

        throw new Error("Not implemented.")

        // readAlterWrite((curWorkspace) => {
        //     curWorkspace.nodes.push(
        //         {
        //             id: node.id,
        //             position: node.position,
        //             type: node.type,
        //             value: node.value,
        //             connections: [],
        //             fullyConnected: false,
        //         }
        //     )
        //     return curWorkspace
        // })

    }

    async removeWSNode(nodeId: number): Promise<void> {
        throw new Error("Not implemented.")
    }

}