import { Request, Response } from 'express'
import { ApiResponse } from '../utils/ApiResponse'
import { asyncHandler } from '../utils/asyncHandler'
import { ApiError } from '../utils/ApiError'
import quicker from '../utils/quicker'

const self = asyncHandler((_: Request, res: Response) => {
    try {
        return res.json(new ApiResponse(200, null, 'Success'))
    } catch (error) {
        if (error instanceof ApiError) {
            throw new ApiError(error.statusCode, error.message)
        } else {
            throw new ApiError(500, 'An unknown error occurred')
        }
    }
})

const health = asyncHandler((_: Request, res: Response) => {
    try {
        
        const health = {
            application: quicker.getApplicationHealth(),
            system: quicker.getSystemHealth(),
            timestamp: Date.now()
        }

        return res.json(new ApiResponse(200, health, 'Success'))
    } catch (error) {
        if (error instanceof ApiError) {
            throw new ApiError(error.statusCode, error.message)
        } else {
            throw new ApiError(500, 'An unknown error occurred')
        }
    }
})

export default { self, health }
