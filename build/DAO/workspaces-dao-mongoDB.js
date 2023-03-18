"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspacesDAOmongoDB = exports.workspacesDAOmongoDBClass = void 0;
const workspaces_dao_type_1 = require("./workspaces-dao-type");
let workspacesDBContent;
// /**
//  * Communicates with *mongoDB* database, gets and updates the database.
//  */
class workspacesDAOmongoDBClass extends workspaces_dao_type_1.IWorkspacesDAO {
    injectDB(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (workspacesDBContent) {
                return;
            }
            try {
                workspacesDBContent = yield conn.db(process.env.DB_N).collection("workspaces");
            }
            catch (e) {
                console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`);
            }
        });
    }
    getWholeWorkspace(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { "user_id": { $eq: userID } };
            let cursor;
            try {
                cursor = yield workspacesDBContent.find(query);
            }
            catch (e) {
                console.error(`Unable to issue find command, ${e}`);
            }
            const readValue = yield cursor.toArray();
            return readValue[0].content;
        });
    }
    updateWholeWorkspace(userID, workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Checking if the document already exists
                const query = { "user_id": { $eq: userID } };
                let cursor;
                try {
                    cursor = yield workspacesDBContent.find(query);
                }
                catch (e) {
                    console.error(`Unable to issue find command, ${e}`);
                }
                const readValue = yield cursor.toArray();
                if (readValue.length === 0) {
                    const insertContent = {
                        user_id: userID,
                        content: workspace
                    };
                    workspacesDBContent.insertOne(insertContent);
                }
                else {
                    workspacesDBContent.updateOne({ user_id: userID }, { $set: { content: workspace } });
                }
            }
            catch (err) {
                console.error(`Unable to post the workspace content: ${err}`);
                return new Error(err);
            }
        });
    }
}
exports.workspacesDAOmongoDBClass = workspacesDAOmongoDBClass;
exports.workspacesDAOmongoDB = new workspacesDAOmongoDBClass();
