import { IWorkspacesDAO } from "./workspaces-dao-type";

let workspacesDBConnection

/**
 * Communicates with *mongoDB* database, gets and updates the database.
 */
export class workspacesDAOmongoDB extends IWorkspacesDAO {

    async injectDB(): Promise<void> {
        
    }

    async getWholeWorkspace(): Promise<void> {

    }

    async updateConnection(): Promise<void> {

    }

    async updateWSNode(): Promise<void> {
        
    }

}

