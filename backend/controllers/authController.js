const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../models/userModel')
const sendEmail = require('../utils/email')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwt')
const crypto = require('crypto')


exports.registerUser = catchAsyncError(async (req,res,next) => {
    
    const {name,email,password,avatar} = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 201, res)
})

exports.loginUser = catchAsyncError(async (req,res,next) => {
    const {email,password} = req.body

    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
})

exports.logoutUser = (req,res,next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httponly: true
    })
    .status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
}


exports.forgotPassword = catchAsyncError( async ( req,res,next) => {
     const user = await User.findOne({ email : req.body.email});

     if(!user){
         return next(new ErrorHandler('User not found with this email', 404))
     }

     const resetToken = user.getResetToken();
     await user.save({ validateBeforeSave : false})

     const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

     const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

     try{
        sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message: message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })


     }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false});
        return next(new ErrorHandler(error.message), 500);
     }
})


exports.resetPassword = catchAsyncError(async (req,res,next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    //createHash('sha256') creates a hash of the token using SHA-256 algorithm
    //update(req.params.token) updates the token with the token from the request parameters
    

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    }); //check if the token is valid and not expired
    // $gt means greater than, so we are checking if the token is still valid (not expired)

    if(!user){
        return next(new ErrorHandler('Reset Password Token is invalid or has expired', 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Passwords do not match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save({validateBeforeSave: false});

    sendToken(user, 201, res);
})