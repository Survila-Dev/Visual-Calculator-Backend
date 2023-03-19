import { IWorkspacesDAO, Workspace } from "./workspaces-dao-type";
import mongodb from "mongodb"
import axios from "axios";
import { access } from "fs";

let workspacesDBContent: any

// /**
//  * Communicates with *mongoDB* database, gets and updates the database.
//  */
export class workspacesDAOmongoDBClass extends IWorkspacesDAO {

    async getUserIDFromAuth(bearerToken: string): Promise<string> {
        //ToDo get the user id from /userinfo endpoint
        try {
            const res = await axios({
                method: 'get',
                url:"https://"+ process.env.AUTH0_DOMAIN + "/userinfo",
                headers: {
                    Authorization: "Bearer " + bearerToken
                },
            });
            console.log("res:")
            console.log(res)
            console.log("res.data.sub:")
            console.log(res.data.sub)
            return res.data.sub
        } catch (e) {
            console.error(e)
            return "Error"
        }

        
    }

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

    async getWholeWorkspace(accessToken: string): Promise<Workspace> {
        // Getting userID:
        const userID = await this.getUserIDFromAuth(accessToken)
  
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

    async updateWholeWorkspace(accessToken: string, workspace: Workspace): Promise<void | Error> {

        try {
            // Getting userID:
            const userID = await this.getUserIDFromAuth(accessToken)

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

