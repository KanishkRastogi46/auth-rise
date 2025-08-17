import { Request, Response } from "express";
import { HttpException } from "./errors/HttpException";

export function globalErrorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  _: any
): void {
  console.error(err.stack);
  res.status(err.status).send({ error: err.message, timestamp: new Date().toISOString() });
}