import { config } from 'dotenv'
import express, {Express, Request, Response} from 'express'
import { createServer } from 'http'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { globalErrorHandler } from './error'
import { correlationIdMiddleware } from './middleware/correlation-id.middleware'
import { NotFoundException } from './errors/NotFoundException'

config()

const app: Express = express()
const server = createServer(app)

const port = Number(process.env.PORT) || 3000

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(correlationIdMiddleware)


app.use((req: Request, res: Response) => {
    res.status(404).json(new NotFoundException('Path doesn\'t exist'))
})

app.use(globalErrorHandler)

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`)
})