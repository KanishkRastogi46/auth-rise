import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";


/**
 * @desc Middleware to add a unique request ID to each request for tracking purposes
 * @param req express Request object
 * @param res express Response object
 * @param next express NextFunction
 */
export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
    const correlationId = req.headers['X-Request-Id'] || randomUUID()
    res.setHeader('X-Request-Id', correlationId)
    next()
}