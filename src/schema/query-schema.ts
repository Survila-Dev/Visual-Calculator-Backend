//ToDo get whole workspace through query




// export type Coordinates2D = {x: number, y: number}
// export type AsyncStatus = "idle" | "loading" | "failed"

// export type TypesOfWSNodes =
//     | "constant"
//     | "addition"
//     | "substraction"
//     | "multiplication"
//     | "division"
//     | "output"
//     | "fork"

// export type WSNodePortConnectionType = {portSelf: number, portOther: number, otherNodeId: number}

// export interface WSNodeType {
//     id: number,
//     type: TypesOfWSNodes,
//     connections: WSNodePortConnectionType[],
//     position: Coordinates2D,
//     value: number | string,
//     fullyConnected: boolean
// }

// export interface Workspace {
//     name: string,
//     id: number,
//     nodes: WSNodeType[],
//     initNodes: WSNodeType[],
//     triggerCalc: boolean
// }

// export interface Workspaces {
//     currentWS: Workspace,
//     status: AsyncStatus,
// }

// export type CalculationSubroutines = {
//     [key in TypesOfWSNodes]: (a: number, b: number) => number
// }