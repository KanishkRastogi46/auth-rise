import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt-token"
import { JwtPayload } from "../types/jwt-payload"
import { UnauthorizedException } from "../errors/UnauthorizedException"
import { HttpStatus } from "../errors/enum/errors.enum"
import { HttpException } from "../errors/HttpException"


/**
 * @desc Middleware to validate user session using JWT token in cookies or Authorization header when accessing protected routes
 * @param req express Request object
 * @param res express Response object
 * @param next express NextFunction
 * @returns 
 */
export async function sessionMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies['accessToken'] || req.headers['authorization']?.split(' ')[1]
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json(new UnauthorizedException('No token, authorization denied'))
        }
        const decoded = verifyToken(token) as JwtPayload
        if (!decoded || !decoded.userId) {
            return res.status(HttpStatus.UNAUTHORIZED).json(new UnauthorizedException('Invalid token, login again'))
        }

        req.user = decoded
        next()
    } catch (error: any) {
        console.log('Invalid token ', error)
        next(new HttpException(error.message, HttpStatus.UNAUTHORIZED))
    }
}