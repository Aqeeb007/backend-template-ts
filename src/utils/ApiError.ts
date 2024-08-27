class ApiError extends Error {
    statusCode: number
    success: boolean

    constructor(statusCode: number = 500, message = 'Something went wrong') {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
    }
}

export { ApiError }
