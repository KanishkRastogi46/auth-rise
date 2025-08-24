import { Request, Response } from "express";
import { HttpException } from "./errors/HttpException";

/**
 * @desc Global error handling middleware
 * @param err HttpException instance
 * @param req express Request object
 * @param res express Response object
 * @param _ any (not used)
 */
export function globalErrorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  _: any
): void {
  console.error(err.stack);
  res.status(err.status).send({ error: err.message, timestamp: new Date().toISOString() });
}