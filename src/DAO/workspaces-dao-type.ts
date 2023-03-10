
//ToDo import and implement the types from frontend

/**
 * Inteface for DAO which communicates with a database and handles the workspace information flow to database.
 */
export abstract class IWorkspacesDAO {

    abstract injectDB(): Promise<void>
    abstract getWholeWorkspace(): Promise<void>
    abstract updateConnection(): Promise<void>
    abstract updateWSNode(): Promise<void>
}