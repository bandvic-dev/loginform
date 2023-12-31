import Menu from './models/Menu.js'
import { validationResult } from 'express-validator'

class menuController {

    async getMenu(req, res) {
        try {
    
        } catch (error) {
            
        }
    }
    
    async newMenuItem(req, res) {
        try {
            const validation = validationResult(req)
            const {title, alias} = req.body
            const isAlias = await Menu.findOne({alias})
            const newMenuItem = new Menu({title, alias})
    
            if(!validation.isEmpty()) {
                return res.status(400).json({ok: false, message: 'Validation Error', validation})
            }
    
            if(isAlias) {
                return res.status(400).json({ok: false, message: `Alias ${alias} exist!`})
            }
    
            await newMenuItem.save()
            
            res.status(201).json({ok: true, message: 'New menu item added success.', redirectUrl: '/auth/dashboard'})
        } catch (err) {
            console.error(err)
        }
    }
    
    async updateMenuItem(req, res) {
        try {
            const validation = validationResult(req)
    
            if(!validation.isEmpty()) {
                return res.status(400).json({ok: false, message: 'Validation Error', validation})
            }
    
            const {_id, title} = req.body
            const menuItem = await Menu.findOne({_id})
            const lastValue = menuItem.title 
            
            menuItem.title = title
            
            await menuItem.save()
    
            res.status(200).json({ok: true, message: 'Menu item updated success.', lastValue, menuItem})
        } catch (err) {
            console.error(err)
        }
    }
    
    async deleteMenuItem(req, res) {
        try {
            const {_id} = req.body
            const menuItem = await Menu.findOne({_id})
    
            if(!menuItem) {
                return res.status(400).json({ok: false, message: `Menu item with ${_id} not found!`})
            }
    
            const toDelete = await Menu.deleteOne({_id})
    
            if(!toDelete) {
                return res.status(400).json({message: `_id ${_id} not deleted`})
            }
    
            return res.status(202).json({message: `_id ${_id} deleted`, redirectUrl: '/auth/dashboard'})
            
        } catch (error) {
            console.error(error)
        }
    }

}

export default new menuController()
