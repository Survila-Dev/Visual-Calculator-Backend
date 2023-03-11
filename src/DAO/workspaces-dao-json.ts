import { IWorkspacesDAO, Workspace, IWSNodeConnection, IWSNodeDatabase, Position2D } from "./workspaces-dao-type";
import { promises as fs } from "fs"

const jsonFileName = "src/DAO/dummyDatabase.json"

const readAlterWrite = async (callback: (Workspace: Workspace) => Workspace) => {
    const data = await fs.readFile(jsonFileName, "utf8")
    const workspace = JSON.parse(data)

    const alteredWorkspace = callback(workspace)

    await fs.writeFile(jsonFileName, JSON.stringify(alteredWorkspace))
}

/**
 * A dummy DAO which saves and updates the data to JSON.
 */
export class workspacesDAOJSON extends IWorkspacesDAO {
    
    async getWholeWorkspace(): Promise<Workspace> {
        const data = await fs.readFile(jsonFileName, "utf8")
        const workspace = JSON.parse(data)
        return workspace
    }

    async injectDB(): Promise<void> {
        console.log("Place holder for database inject subroutine.")
    }

    async addNewConnection(connection: IWSNodeConnection): Promise<void> {
        readAlterWrite((curWorkspace) => {

            curWorkspace.nodes[connection.firstNodeId].connections.push({
                otherNodeId: curWorkspace.nodes[connection.secondNodeId].id,
                portOther: connection.secondPortId,
                portSelf: connection.firstPortId
            })

            curWorkspace.nodes[connection.secondNodeId].connections.push({
                otherNodeId: curWorkspace.nodes[connection.firstNodeId].id,
                portOther: connection.firstPortId,
                portSelf: connection.secondPortId
            })

            return curWorkspace

        })
        
    }

    async removeConnection(connection: IWSNodeConnection): Promise<void> {
        //ToDo Remove the connection from both nodes
        
    }

    async addNewWSNode(node: IWSNodeDatabase): Promise<void> {

        readAlterWrite((curWorkspace) => {
            curWorkspace.nodes.push(
                {
                    id: node.id,
                    position: node.position,
                    type: node.type,
                    value: node.value,
                    connections: [],
                    fullyConnected: false,
                }
            )
            return curWorkspace
        })

    }

    async removeWSNode(nodeId: number): Promise<void> {
        //ToDo Remove the connections between the to be deleted node
        
        //ToDo Remove the node itself
        
    }

    async updateWSNodePosition(nodeId: number, newPosition: Position2D): Promise<void> {

        readAlterWrite((curWorkspace) => {
            curWorkspace.nodes[nodeId].position = newPosition

            return curWorkspace
        })
    }

}