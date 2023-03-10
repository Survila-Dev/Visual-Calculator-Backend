import { Position2D } from "../schema/types"

/**
 * Inteface for DAO which communicates with a database and handles the workspace information flow to the said database.
 */
export abstract class IWorkspacesDAO {

    abstract injectDB(): Promise<void>
    abstract getWholeWorkspace(): Promise<Workspace>

    /**
     * Add or remove connection between workspace nodes.
     */
    abstract updateConnection(): Promise<void>
    /**
     * Add or remove workspace nodes.
     */
    abstract updateWSNodes(): Promise<void>

    abstract updateWSNodePosition(nodeId: number, newPosition: Position2D): Promise<void>
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