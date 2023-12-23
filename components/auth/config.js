import dotenv from 'dotenv'

const {AUTH_TOKEN_SECRET} = dotenv.config().parsed

export const config = {
    secret: AUTH_TOKEN_SECRET,
    expiresIn: '1h'
}
