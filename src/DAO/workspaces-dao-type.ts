
//ToDo import and implement the types from frontend

/**
 * Inteface for DAO which communicates with a database and handles the workspace information flow to database.
 */
export abstract class IWorkspacesDAO {

    abstract injectDB(): void
    abstract getWholeWorkspace(): void
    abstract updateConnection(): void
    abstract updateWSNode(): void
}