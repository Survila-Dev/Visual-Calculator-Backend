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
  
        const query = {"user_id": {$eq: userID}}
        let cursor
        try {
            cursor = await workspacesDBContent.find(query)
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`)
        }
        const readValue = await cursor.toArray()
        
        return readValue[0].content

    }

    async updateWholeWorkspace(userID: string, workspace: Workspace): Promise<void | Error> {

        try {
            // Checking if the document already exists
            const query = {"user_id": {$eq: userID}}
            let cursor
            try {
                cursor = await workspacesDBContent.find(query)
            } catch(e) {
                console.error(`Unable to issue find command, ${e}`)
            }
            const readValue = await cursor.toArray()

            if (readValue.length === 0) {
                const insertContent = {
                    user_id: userID,
                    content: workspace
                }

                workspacesDBContent.insertOne(insertContent)
            } else {
                workspacesDBContent.updateOne(
                    { user_id: userID },
                    { $set: { content: workspace } },
                )
            }

        } catch (err) {
            console.error(`Unable to post the workspace content: ${err}`)
            return new Error(err as string)
        }
    }

}

export const workspacesDAOmongoDB = new workspacesDAOmongoDBClass()

