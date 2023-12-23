import express from 'express'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import authRouter from './components/auth/authRouter.js'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';

const env = dotenv.config().parsed
const app = express()
const PORT = env.SITE_URL.split(':').pop() || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('static'))
app.set('views', [
  path.join(__dirname, 'public/views'),
  path.join(__dirname, 'private/views')
]);
app.use('/auth', authRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Что-то сломалось')
})

const startServer = (PORT) => {
  try {
    app.listen(PORT, async () => {
      await mongoose.connect(`mongodb+srv://${env.DB_DATABASE}:${env.DB_PASSWORD}@${env.DB_USERNAME}.c47gzoh.mongodb.net/?retryWrites=true&w=majority`)
      console.log(`Server started on port ${PORT}`);
    })
  } catch (error) {
    console.error(error);
  }
}

startServer(PORT)

