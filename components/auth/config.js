import dotenv from 'dotenv'
import { check } from "express-validator"

const {AUTH_TOKEN_SECRET} = dotenv.config().parsed

export const config = {
    secret: AUTH_TOKEN_SECRET,
    expiresIn: '1h',
    rules: {
        registration: [
            check('username', 'User name can\'t be empty').isLength({min:3, max:15}).escape().trim(),
            check('password', 'Pasword must have min 5 max 8 symbols').isLength({min: 5, max: 8}).escape().trim()
        ],
        login: [
            check('username', 'User name can\'t be empty').isLength({min:3, max:15}).escape().trim(),
            check('password', 'Pasword must have min 5 max 8 symbols').isLength({min: 5, max: 8}).escape().trim()
        ],
    }
}
