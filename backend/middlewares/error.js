module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
   

    if( process.env.NODE_ENV === 'production' ){
        let error = {...err};

        if(err.name == 'CastError'){
            let message = `Resource not found: ${err.path}`
            error = new Error(message, 400)
        }
        if(err.name == 'ValidationError'){
            let message = Object.values(err.errors).map(value => value.message)
            error = new Error(message, 400)
        }
        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error' 
        })
    }
    if( process.env.NODE_ENV == 'development' ){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            err: err
        })
    }
   
}