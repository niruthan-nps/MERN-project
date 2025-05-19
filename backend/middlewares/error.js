const { stack } = require("../app");


/**In Express, **any middleware function with 4 arguments** (`err, req, res, next`) is **automatically recognized as an error handler*/
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
     
    if(process.env.NODE_ENV == 'devolopment'){
        res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack:err.stack,
        error: err,
     })
    }

    if(process.env.NODE_ENV == 'production'){

        let message = err.message;
        //Mongoose bad ObjectId error
        let error = new Error(message);

        if(err.name === 'ValidationError'){
            message = Object.values(err.errors).map(value => value.message);
            error = new Error(message, 400);
        }

        if(err.name === 'CastError'){
            message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message, 400);
        }//object id mismatch error


        res.status(err.statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error',
        // message
     })
    }
}

/**
- Sends the error response back to the client.
- `res.status(err.statusCode)` sets the HTTP response code (e.g., 400, 404, 500).
- The body is a JSON object with:
  - `success: false` — indicating the operation failed.
  - `message: err.message` — gives a human-readable error message.


1.Imagine you have this in a controller:
if (!product) {
    return next(new ErrorHandler("Product not found", 404));
}

2. Your error handler class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

3.Then the error middleware you posted will:
--Catch the ErrorHandler object
--Use its message and statusCode
--Send a JSON response like:
    {
        "success": false,
        "message": "Product not found"
    }

*/


