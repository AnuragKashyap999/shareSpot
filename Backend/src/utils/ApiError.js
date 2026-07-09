class ApiError extends Error{
    constructor(statusCode,data,errors=[],stack='',message="Something went wrong"){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success= false
        this.errors=errors
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)

        }


    }
}

export default ApiError