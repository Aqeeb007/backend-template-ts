import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import path from 'path'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../', 'public')))

 
app.use(helmet())
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: ['https://client.com'],
        credentials: true
    })
)

// Routes
import apiRouter from './router/apiRouter'
import { ApiError } from './utils/ApiError'
import responseMessages from './constants/responseMessages'

app.use('/api/v1', apiRouter)



// Error Handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((_: Request, __: Response) => {
    throw new ApiError(404, responseMessages.NOT_FOUND('Route'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _: Request, res: Response, __: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            statusCode: err.statusCode
        })
    } else {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            statusCode: 500
        })
    }
})

export default app
