import { config } from '../config.js'
import jwt from 'jsonwebtoken'

export default function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.cookies.auth
        
        if(!token) {
            return res.status(403).json({message: 'User unauthorized!'})
        }

        const decodedData = jwt.verify(token, config.secret)
 
        req.user = decodedData
        next()
    } catch (error) {
        return res.status(403).json({message: 'User unauthorized!'})
    }
}