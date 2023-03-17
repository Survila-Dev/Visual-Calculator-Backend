import { IWorkspacesDAO, Workspace } from "./workspaces-dao-type";
import mongodb from "mongodb"

let workspacesDBContent: any

// /**
//  * Communicates with *mongoDB* database, gets and updates the database.
//  */
export class workspacesDAOmongoDBClass extends IWorkspacesDAO {

    async injectDB(conn: mongodb.MongoClient): Promise<void> {
        if (workspacesDBContent) {
            return
        }
        try {
            workspacesDBContent = await conn.db(process.env.DB_N).collection("workspaces")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`
            )
        }
    }

    async getWholeWorkspace(userID: string): Promise<Workspace> {
        const dummy: Workspace = {
            id: 0,
            initNodes: [],
            name: "no name",
            nodes: [],
            triggerCalc: false
        }
        return dummy
    }

    async updateWholeWorkspace(userID: string, workspace: Workspace): Promise<void> {

        // update existing workspace or write new one
    }

}

export const workspacesDAOmongoDB = new workspacesDAOmongoDBClass()

