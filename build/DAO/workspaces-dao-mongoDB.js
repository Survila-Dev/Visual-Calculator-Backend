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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspacesDAOmongoDB = exports.workspacesDAOmongoDBClass = void 0;
const workspaces_dao_type_1 = require("./workspaces-dao-type");
const axios_1 = __importDefault(require("axios"));
let workspacesDBContent;
// /**
//  * Communicates with *mongoDB* database, gets and updates the database.
//  */
class workspacesDAOmongoDBClass extends workspaces_dao_type_1.IWorkspacesDAO {
    getUserIDFromAuth(bearerToken) {
        return __awaiter(this, void 0, void 0, function* () {
            //ToDo get the user id from /userinfo endpoint
            // return "12345"
            console.log(process.env.AUTH0_DOMAIN + "userinfo");
            try {
                console.log("getting the user id");
                const res = yield (0, axios_1.default)({
                    method: 'get',
                    url: process.env.AUTH0_DOMAIN + "userinfo",
                    headers: {
                        'Authorization': bearerToken,
                        // 'Content-Type': `application/json`,
                        // 'Accept'      : `application/json`,
                        // "Access-Control-Allow-Origin": "*",
                    },
                });
                // console.log("res:")
                // console.log(res)
                console.log("Request for user info successful");
                console.log("res.data.sub:");
                console.log(res.data.sub);
                return res.data.sub;
            }
            catch (e) {
                console.log("Request for user info failed");
                console.error(e);
                return "Error";
            }
        });
    }
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
    getWholeWorkspace(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // Getting userID:
            const userID = yield this.getUserIDFromAuth(accessToken);
            // const userID = "12345"
            console.log("Executing the code in backend.");
            const query = { "user_id": { $eq: userID } };
            let cursor;
            try {
                cursor = yield workspacesDBContent.find(query);
            }
            catch (e) {
                console.error(`Unable to issue find command, ${e}`);
            }
            const readValue = yield cursor.toArray();
            if (readValue[0] !== undefined) {
                return readValue[0].content;
            }
            else {
                console.log("Return default workspace because no database value there.");
                return ({
                    "name": "First workspace - hello world",
                    "id": 0,
                    "nodes": [],
                    "initNodes": [],
                    "triggerCalc": false,
                    "fieldPosition": {
                        "x": 0,
                        "y": 0
                    },
                    "curveConnections": []
                });
            }
        });
    }
    updateWholeWorkspace(accessToken, workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Getting userID:
                const userID = yield this.getUserIDFromAuth(accessToken);
                // const userID = "12345"
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
