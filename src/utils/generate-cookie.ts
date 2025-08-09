import { CookieOptions, Response } from "express";

export function generateCookie(res: Response, key: string, value: string) {
    const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 1,
    }
    res.cookie(key, value, options)
}