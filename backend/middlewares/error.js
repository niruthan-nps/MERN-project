// const { stack } = require("../app");


// /**In Express, **any middleware function with 4 arguments** (`err, req, res, next`) is **automatically recognized as an error handler*/
// module.exports = (err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
     
//     if(process.env.NODE_ENV == 'devolopment'){
//         res.status(err.statusCode).json({
//         success: false,
//         message: err.message,
//         stack:err.stack,
//         error: err,
//      })
//     }

//     if(process.env.NODE_ENV == 'production'){

//         let message = err.message;
//         //Mongoose bad ObjectId error
//         let error = new Error(message);

//         // if(err.name === 'ValidationError'){
//         //     message = Object.values(err.errors).map(value => value.message);
//         //     error = new Error(message,400);
//         //     error.statusCode = 400; //Bad Request
//         // }

//         if (err.name === 'ValidationError') {
//             err.message     = Object.values(err.errors).map(v => v.message).join(', ');
//             err.statusCode  = 400;
//             }

        

//         if(err.name === 'CastError'){
//             message = `Resource not found. Invalid: ${err.path}`;
//             error = new Error(message, 400);
//         }//object id mismatch error

//         if(err.code === 11000){
//            let message = `Duplicate ${Object.keys(err.keyValue)} entered`;
//             error = new Error(message);
//         }

//         if(err.name === 'JSONWebTokenError'){
//             message = 'Json Web Token is invalid. Try again';
//             error = new Error(message);
//         }
//         if(err.name === 'TokenExpiredError'){
//             message = 'Json Web Token is expired. Try again';
//             error = new Error(message);
//         }

//         res.status(err.statusCode).json({
//         success: false,
//         message: error.message || 'Internal Server Error',
//         // message
//      })
//     }
// }



const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV == "development"){
        res.status(err.statusCode).json({
            success: "false",
            message: err.message,
            stack: err.stack,
            error: err
        })
    }

    if(process.env.NODE_ENV == "production"){
        let message = err.message;
        let error = new Error(message);

        if(err.name == "ValidationError"){
            message = Object.values(err.errors).map(value => value.message);
            error = new Error(message); 
            err.statusCode =400;
        }

        if(err.name== 'CastError'){
            message = `Resource not found: ${err.path}`;
            error = new Error(message);
            err.statusCode =400;
        }

        if(err.code == 11000){
            let message = `Duplicate key ${Object.keys(err.keyValue)} error`;
            error = new Error(message);
            err.statusCode =400;

        }

        if(err.name == 'JSONWebTokenError'){
            let message = `JSON Web Token is invalid. try again`;
            error = new Error(message);
            err.statusCode =400;
        }

        if(err.name == 'TokenExpiredError'){
            let message = `JSON Web Token is expired. try again`;
            error = new Error(message);
            err.statusCode =400;
        }


        res.status(err.statusCode).json({
            success: "fasle",
            message: error.message || "Internal Server error"
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