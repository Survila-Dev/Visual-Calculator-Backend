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
/**
 * A dummy DAO which saves and updates the data to JSON.
 */
class workspacesDAOJSON extends workspaces_dao_type_1.IWorkspacesDAO {
    getWholeWorkspace() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fs_1.promises.readFile(jsonFileName, "utf8");
            const workspace = JSON.parse(data);
            return workspace;
        });
    }
    injectDB() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    addNewConnection(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create new connection and add it to both nodes
        });
    }
    removeConnection(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove the connection from both nodes
        });
    }
    addNewWSNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            // Append new ws node to the workspace object.
            const data = yield fs_1.promises.readFile(jsonFileName, "utf8");
            const curWorkspace = JSON.parse(data);
            curWorkspace.nodes.push({
                id: node.id,
                position: node.position,
                type: node.type,
                value: node.value,
                connections: [],
                fullyConnected: false,
            });
            // Overwrite the json file
            yield fs_1.promises.writeFile(jsonFileName, JSON.stringify(curWorkspace));
        });
    }
    removeWSNode(nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove the connections between the to be deleted node
            // Remove the node itself
        });
    }
    updateWSNodePosition(nodeId, newPosition) {
        return __awaiter(this, void 0, void 0, function* () {
            // Update the position of single ws node
            // Append new ws node to the workspace object.
            const data = yield fs_1.promises.readFile(jsonFileName, "utf8");
            const curWorkspace = JSON.parse(data);
            curWorkspace.nodes[nodeId].position = newPosition;
            // Overwrite the json file
            yield fs_1.promises.writeFile(jsonFileName, JSON.stringify(curWorkspace));
        });
    }
}
exports.workspacesDAOJSON = workspacesDAOJSON;
