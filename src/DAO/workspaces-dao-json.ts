import { IWorkspacesDAO } from "./workspaces-dao-type";

/**
 * A dummy DAO which saves and updates the data to JSON.
 */
export class workspacesDAOJSON extends IWorkspacesDAO {

    async getWholeWorkspace(): Promise<void> {
        
    }
    async injectDB(): Promise<void> {
        
    }
    async updateConnection(): Promise<void> {
        
    }
    async updateWSNode(): Promise<void> {
        
    }

}