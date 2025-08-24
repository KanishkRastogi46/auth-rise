import { plainToInstance } from "class-transformer"
import { validate, ValidationError } from "class-validator"
import { NextFunction, Request, Response } from "express"
import { HttpException } from "../errors/HttpException"

/** 
 * @desc Middleware tovalidate request body for a given class type
 * @param req Express Request object
 * @param res Express Response object
 * @param next Express NextFunction callback
 */
export async function validatorMiddleware(req: Request, res: Response, next: NextFunction) {
    return async function (anyDtoClass: any) {
        try {
            const dto = plainToInstance(anyDtoClass, req.body)
            const errors: ValidationError[] = await validate(dto)
    
            if (errors.length > 0) {
                const error = errors.flatMap(
                    (error: ValidationError) => Object.values(error.constraints || {})
                ).join(', ')
                next(new HttpException(error, 400))
            }
    
            req.body = dto
            next()
        } catch (error) {
            next(new HttpException('Error during validation', 400))
        }
    } 
}
