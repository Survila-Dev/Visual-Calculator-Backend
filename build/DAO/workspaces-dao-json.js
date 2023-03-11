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
exports.workspacesDAOJSON = void 0;
const workspaces_dao_type_1 = require("./workspaces-dao-type");
const fs_1 = require("fs");
const jsonFileName = "src/DAO/dummyDatabase.json";
const readAlterWrite = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fs_1.promises.readFile(jsonFileName, "utf8");
    const workspace = JSON.parse(data);
    const alteredWorkspace = callback(workspace);
    yield fs_1.promises.writeFile(jsonFileName, JSON.stringify(alteredWorkspace));
});
/**
 * A dummy DAO which saves and updates the data to JSON.
 */
class workspacesDAOJSON extends workspaces_dao_type_1.IWorkspacesDAO {
    injectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Place holder for database inject subroutine.");
        });
    }
    getWholeWorkspace() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Overwriting workspace from backend.");
            const data = yield fs_1.promises.readFile(jsonFileName, "utf8");
            const workspace = JSON.parse(data);
            return workspace;
        });
    }
    updateWSNodePosition(nodeId, newPosition) {
        return __awaiter(this, void 0, void 0, function* () {
            readAlterWrite((curWorkspace) => {
                curWorkspace.nodes[nodeId].position = newPosition;
                return curWorkspace;
            });
        });
    }
    updateWholeWorkspace(newWorkspace) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Updating the workspace.");
            readAlterWrite((curWorksapce) => {
                return newWorkspace;
            });
        });
    }
    addNewConnection(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
            // readAlterWrite((curWorkspace) => {
            //     curWorkspace.nodes[connection.firstNodeId].connections.push({
            //         otherNodeId: curWorkspace.nodes[connection.secondNodeId].id,
            //         portOther: connection.secondPortId,
            //         portSelf: connection.firstPortId
            //     })
            //     curWorkspace.nodes[connection.secondNodeId].connections.push({
            //         otherNodeId: curWorkspace.nodes[connection.firstNodeId].id,
            //         portOther: connection.firstPortId,
            //         portSelf: connection.secondPortId
            //     })
            //     return curWorkspace
            // })
        });
    }
    removeConnection(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
    addNewWSNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
            // readAlterWrite((curWorkspace) => {
            //     curWorkspace.nodes.push(
            //         {
            //             id: node.id,
            //             position: node.position,
            //             type: node.type,
            //             value: node.value,
            //             connections: [],
            //             fullyConnected: false,
            //         }
            //     )
            //     return curWorkspace
            // })
        });
    }
    removeWSNode(nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented.");
        });
    }
}
exports.workspacesDAOJSON = workspacesDAOJSON;
