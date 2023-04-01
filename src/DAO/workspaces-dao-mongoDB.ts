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
        // return "12345"
        console.log(process.env.AUTH0_DOMAIN + "userinfo")
        try {
            console.log("getting the user id")
            const res = await axios({
                method: 'get',
                url:process.env.AUTH0_DOMAIN + "userinfo",
                headers: {
                    'Authorization': bearerToken,
                    // 'Content-Type': `application/json`,
                    // 'Accept'      : `application/json`,
                    // "Access-Control-Allow-Origin": "*",
                },
            });
            // console.log("res:")
            // console.log(res)
            console.log("Request for user info successful")
            console.log("res.data.sub:")
            console.log(res.data.sub)
            return res.data.sub
        } catch (e) {
            console.log("Request for user info failed")
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
        // const userID = "12345"
  
        console.log("Executing the code in backend.")

        const query = {"user_id": {$eq: userID}}
        let cursor
        try {
            cursor = await workspacesDBContent.find(query)
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`)
        }
        const readValue = await cursor.toArray()

        if (readValue[0] !== undefined) {
            return readValue[0].content
        } else {
            console.log("Return default workspace because no database value there.")
            return ({
                "name": "First workspace - hello world",
                "id": 0,
                "nodes": [
                ],
                "initNodes": [],
                "triggerCalc": false,
                "fieldPosition": {
                    "x": 0,
                    "y": 0
                },
                "curveConnections": []
            })
        }
        
        

    }

    async updateWholeWorkspace(accessToken: string, workspace: Workspace): Promise<void | Error> {

        try {
            // Getting userID:
            const userID = await this.getUserIDFromAuth(accessToken)
            // const userID = "12345"

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

