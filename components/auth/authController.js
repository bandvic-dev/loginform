import User from './models/User.js'
import Menu from '../menu/models/Menu.js'
import Role from './models/Role.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { authConfig } from './authConfig.js'

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, authConfig.secret, {expiresIn: authConfig.expiresIn})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Validation Error', errors})
            }

            const {username, password} = req.body
            const candidate = await User.findOne({username})

            if(candidate) {
                return res.status(400).json({message: `User with name ${username} already exist!`})
            }

            const hashPasword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPasword, roles: [userRole.value]})
            await user.save()
            
            return res.status(201).json({message: `User ${username} registered succesfully!`})
        } catch (error) {
            res.status(400).json({message: 'Registration Error'})
        }
    }

    async login(req, res) {
        try {
            const validation = validationResult(req)

            if(!validation.isEmpty()) {
                return res.status(400).json({ok: false, message: 'Validation Error', validation})
            }
            
            const {username, password} = req.body
            const user = await User.findOne({username})

            if(!user) {
                return res.status(400).json({ok: false, message: `User ${username} not found!`})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            
            if(!validPassword) {
                return res.status(400).json({ok: false, message: `Password for ${username} uncorrect!`})
            }

            const token = generateAccessToken(user._id, user.roles)
            res.cookie('auth', token, { maxAge: 9000000, httpOnly: true })

            return res.json({ok: true, message: 'Login seccess', redirectUrl: '/auth/dashboard', token})

        } catch (error) {
            res.status(400).json({message: 'Login Error'})
        }
    }

    async logout(req, res) {
        try {
            res.cookie('auth', '', { maxAge: 0, httpOnly: true })
            res.status(200).json({redirectUrl: '/auth/'})
        } catch (error) {
            res.status(401).json({error: 'Failed Logout'})
        }

    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.status(200).send(users)
        } catch (error) {
            res.status(400).json({message: 'Get users Error'})
        }
    }

    index(req, res) {
        if(!req.cookies.auth) {
           return res.render('login')
        }

        res.redirect('/auth/dashboard')

    }

    async dashboard(req, res) {
        const userMenu = await Menu.find()
        res.render('dashboard', {userMenu})
    }
}

export default new authController()
