import { IWorkspacesDAO, Workspace } from "./workspaces-dao-type";

let workspacesDBConnection

// /**
//  * Communicates with *mongoDB* database, gets and updates the database.
//  */
// export class workspacesDAOmongoDB extends IWorkspacesDAO {

//     async injectDB(): Promise<void> {
        
//     }

//     async getWholeWorkspace(): Promise<Workspace> {
//         const dummyWorkspace: Workspace = {
//             id: 0,
//             initNodes: [],
//             name: "dummy cur workspace",
//             nodes: [],
//             triggerCalc: false
//         }
//         return dummyWorkspace
//     }

//     async updateConnection(): Promise<void> {

//     }

//     async updateWSNode(): Promise<void> {
        
//     }

// }

