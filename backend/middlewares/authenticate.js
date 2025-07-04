const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError( async (req, res, next) => {
    const { token } = req.cookies; //app.use(cookieParser()); is used in app.js

    if(!token){
        return next(new ErrorHandler('login first to handle this resource', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id)
    next();

})


exports.authorizeRoles = (...roles) => { //s an array of allowed roles passed to the middleware
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`,401));
        }
        next(); // continue if the role is allowed
    };
};
