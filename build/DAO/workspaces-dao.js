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
exports.workspacesDAOmongoDB = void 0;
const workspaces_dao_type_1 = require("./workspaces-dao-type");
let workspacesDBConnection;
/**
 * Communicates with *mongoDB* database, gets and updates the database.
 */
class workspacesDAOmongoDB extends workspaces_dao_type_1.IWorkspacesDAO {
    injectDB() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getWholeWorkspace() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateConnection() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateWSNode() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.workspacesDAOmongoDB = workspacesDAOmongoDB;
