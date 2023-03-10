
/**
 * Inteface for DAO which communicates with a database and handles the workspace information flow to the said database.
 */
export abstract class IWorkspacesDAO {

    abstract injectDB(): Promise<void>
    abstract getWholeWorkspace(): Promise<void>
    abstract updateConnection(): Promise<void>
    abstract updateWSNode(): Promise<void>
}