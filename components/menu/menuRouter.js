import express from "express"
import menuController from "./menuController.js"
import roleMiddleware from "../auth/middlewares/roleMiddleware.js"
import { menuConfig } from './menuConfig.js'
const menuRouter = express.Router()

menuRouter.post('/newMenuItem', menuConfig.rules.menuAddItem, roleMiddleware(['ADMIN']), menuController.newMenuItem)
menuRouter.put('/updateMenuItem', menuConfig.rules.menuUpdateItem, roleMiddleware(['ADMIN']), menuController.updateMenuItem)
menuRouter.delete('/deleteMenuItem', roleMiddleware(['ADMIN']), menuController.deleteMenuItem)
menuRouter.get('/menu', menuController.getMenu)

export default menuRouter
