"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
/**
 * Middleware which logs the `req` url.
 * @param req
 * @param res
 * @param next
 */
const loggerMiddleware = (req, res, next) => {
    console.log(`Request from ${req.url}. Header - ${req.header}. Request - ${req}.`);
    next();
};
exports.loggerMiddleware = loggerMiddleware;
