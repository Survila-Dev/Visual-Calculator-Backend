import mongodb from "mongodb"

/**
 * WS node connection interface to communicate with database.
 */
export interface IWSNodeConnection {
    firstNodeId: number, firstPortId: number, secondNodeId: number, secondPortId: number
}

export interface Position2D {
    x: number,
    y: number
}

/**
 * Node interface for communicating with database.
 */
export interface IWSNodeDatabase {
    id: number,
    type: TypesOfWSNodes,
    position: Coordinates2D,
    value: number | string,
}

/**
 * Inteface for DAO which communicates with a database and handles the workspace information flow to the said database.
 */
export abstract class IWorkspacesDAO {

    abstract injectDB(client: mongodb.MongoClient): Promise<void>

    abstract getWholeWorkspace(userID: string): Promise<Workspace>

    abstract updateWholeWorkspace(userID: string, newWorkspace: Workspace): Promise<void>

    // abstract addNewConnection?(connection: IWSNodeConnection): Promise<void>

    // abstract removeConnection?(connection: IWSNodeConnection): Promise<void>

    // abstract addNewWSNode?(node: IWSNodeDatabase): Promise<void>

    // abstract removeWSNode?(nodeId: number): Promise<void>

    // abstract updateWSNodePosition(nodeId: number, newPosition: Position2D): Promise<void>
    
    
}

/**
 * TYPES FROM FRONTEND
 */

export type Coordinates2D = {x: number, y: number}
export type AsyncStatus = "idle" | "loading" | "failed"

export type TypesOfWSNodes =
    | "constant"
    | "addition"
    | "substraction"
    | "multiplication"
    | "division"
    | "output"
    | "fork"

export type WSNodePortConnectionType = {portSelf: number, portOther: number, otherNodeId: number}

export interface WSNodeType {
    id: number,
    type: TypesOfWSNodes,
    connections: WSNodePortConnectionType[],
    position: Coordinates2D,
    value: number | string,
    fullyConnected: boolean
}

export interface Workspace {
    name: string,
    id: number,
    nodes: WSNodeType[],
    initNodes: WSNodeType[],
    triggerCalc: boolean
}

export interface Workspaces {
    currentWS: Workspace,
    status: AsyncStatus,
}

export type CalculationSubroutines = {
    [key in TypesOfWSNodes]: (a: number, b: number) => number
}