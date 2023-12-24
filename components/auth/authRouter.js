import express from "express"
import authController from "./authController.js"
import roleMiddleware from "./middlewares/roleMiddleware.js"
import { config } from './config.js'
const authRouter = express.Router()

authRouter.post('/registration', config.rules.registration, authController.registration)
authRouter.post('/login', config.rules.login, authController.login)

authRouter.get('/logout', authController.logout)
authRouter.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)
authRouter.get('/', authController.index)
authRouter.get('/dashboard', roleMiddleware(['ADMIN']), authController.dashboard)

export default authRouter
