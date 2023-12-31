import dotenv from 'dotenv'
import { check } from "express-validator"

const {AUTH_TOKEN_SECRET} = dotenv.config().parsed

export const menuConfig = {
    rules: {
        menuAddItem: [
            check('title', 'Title name can\'t be empty').isLength({min:1, max:120}).escape().trim(),
            check('alias', 'Alias name can\'t be empty').isLength({min:1, max:60}).escape().trim(),
        ],
        menuUpdateItem: [
            check('title', 'Title name can\'t be empty').isLength({min:1, max:120}).escape().trim(),
        ]
    }
}
