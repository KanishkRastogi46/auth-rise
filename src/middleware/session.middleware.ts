import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt-token"
import { JwtPayload } from "../types/jwt-payload"

export async function sessionMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies['accessToken'] || req.headers['authorization']?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ status: 'Unauthorized', message: 'Session expired, login again.', success: false })
        }
        const decoded = verifyToken(token) as JwtPayload
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ status: 'Unauthorized', message: 'Invalid token, login again.', success: false })
        }

        req.user = decoded
        next()
    } catch (error) {
        console.log('Invalid token ', error)
        next(error)
    }
}