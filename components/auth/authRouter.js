import express from "express"
import authController from "./authController.js"
import roleMiddleware from "./middlewares/roleMiddleware.js"
import { check } from "express-validator"
const authRouter = express.Router()

authRouter.post('/registration', [
    check('username', 'User name can\'t be empty').notEmpty().isLength({min:3, max:15}),
    check('password', 'Pasword must have min 5 max 8 symbols').isLength({min: 5, max: 8})
], authController.registration)

authRouter.post('/login', [
    check('username', 'User name can\'t be empty').notEmpty().isLength({min:3, max:15}),
    check('password', 'Pasword must have min 5 max 8 symbols').isLength({min: 5, max: 8})
], authController.login)
authRouter.get('/logout', authController.logout)
authRouter.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)
authRouter.get('/', authController.index)
authRouter.get('/dashboard', roleMiddleware(['ADMIN']), authController.dashboard)

export default authRouter
