class AppError extends Error{
    public statusCode: number
    public errors?: any

    constructor(public message: string, statusCode = 500, errors?: any){
        super(message)

        this.statusCode = statusCode;
        this.errors = errors
    }
}

export default AppError