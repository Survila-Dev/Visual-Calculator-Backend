import { RequestHandler } from "express-serve-static-core"

/**
 * Middleware which logs the `req` url.
 * @param req 
 * @param res 
 * @param next 
 */
export const loggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(`Request from ${req.url}. Header - ${req.header}. Request - ${req}.`)
    next()
}