import { Router } from "express"
import { auth } from "../config/api-routes"
import { login, register } from "../controller/auth.controller"

export const authRouter = Router({
    mergeParams: true
})

authRouter.route(auth.register).post(register)
authRouter.route(auth.login).post(login)
// authRouter.route(auth.otp).post()
// authRouter.route(auth.resendOtp).post()
// authRouter.route(auth.logout).post()
// authRouter.route(auth.refresh).post()
// authRouter.route(auth.forgotPassword).post()
// authRouter.route(auth.resetPassword).post()