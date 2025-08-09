import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";

export function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
    const correlationId = req.headers['X-Request-Id'] || randomUUID()
    res.setHeader('X-Request-Id', correlationId)
    next()
}