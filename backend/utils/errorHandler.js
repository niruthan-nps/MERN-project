class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = ErrorHandler;
// This class is used to create a custom error handler that extends the built-in Error class. It takes a message and a status code as parameters and sets them as properties of the instance. The captureStackTrace method is called to capture the stack trace at the point where the error was created, which can be useful for debugging.
// This class can be used to create and throw custom errors in your application, making it easier to handle errors consistently and provide meaningful error messages to users or developers.