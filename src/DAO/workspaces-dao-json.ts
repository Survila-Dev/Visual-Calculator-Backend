import { Position2D } from "../schema/types";
import { IWorkspacesDAO, Workspace } from "./workspaces-dao-type";

/**
 * A dummy DAO which saves and updates the data to JSON.
 */
export class workspacesDAOJSON extends IWorkspacesDAO {

    async getWholeWorkspace(): Promise<Workspace> {
        const dummyWorkspace: Workspace = {
            id: 0,
            initNodes: [],
            name: "dummy cur workspace",
            nodes: [],
            triggerCalc: false
        }
        return dummyWorkspace
    }
    async injectDB(): Promise<void> {
        
    }
    async updateConnection(): Promise<void> {
        
    }
    async updateWSNodes(): Promise<void> {
        
    }

    async updateWSNodePosition(nodeId: number, newPosition: Position2D): Promise<void> {



        return
    }

}