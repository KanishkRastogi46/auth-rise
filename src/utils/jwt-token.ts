import { sign, verify, SignOptions, Algorithm, VerifyOptions } from "jsonwebtoken"
import { JwtPayload } from "../types/jwt-payload"

export function signToken(payload: JwtPayload) {
    const options: SignOptions = {
        algorithm: process.env.JWT_ALGORITHM as Algorithm,
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        expiresIn: '1H'
    }
    return sign(payload, String(process.env.JWT_SECRET), options)
}

export function verifyToken(token: string) {
    const options: VerifyOptions = {
        algorithms: [process.env.JWT_ALGORITHM as Algorithm],
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
    }
    return verify(token, String(process.env.JWT_SECRET), options)
}