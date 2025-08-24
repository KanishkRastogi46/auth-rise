import { Request, Response, NextFunction } from "express"
import expressAsyncHandler from "express-async-handler"

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 */
export const register = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
})


/**
 * @desc  User Login 
 * @route        POST /api/v1/auth/login
 */
export const login = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
})