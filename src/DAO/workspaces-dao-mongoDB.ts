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
        // const dummy: Workspace = {
        //     id: 0,
        //     initNodes: [],
        //     name: "no name",
        //     nodes: [],
        //     triggerCalc: false
        // }
        const query = {"user_id": {$eq: userID}}
        let cursor
        try {
            cursor = await workspacesDBContent.find(query)
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`)
        }
        const readValue = cursor.toArray()

        return readValue[0].content

        // return dummy
    }

    async updateWholeWorkspace(userID: string, workspace: Workspace): Promise<void | Error> {

        try {
            // check if the user id exists, if so update, if not insert new one
            // update existing workspace or write new one
            const dummy: Workspace = {
                id: 0,
                initNodes: [],
                name: "no name",
                nodes: [],
                triggerCalc: false
            }

            const insertContent = {
                user_id: userID,
                content: dummy
            }

            workspacesDBContent.insertOne(insertContent)

        } catch (err) {
            console.error(`Unable to post the workspace content: ${err}`)
            return new Error(err as string)
        }
    }

}

export const workspacesDAOmongoDB = new workspacesDAOmongoDBClass()

