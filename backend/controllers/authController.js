const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../models/userModel')
const sendEmail = require('../utils/email')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwt')
const crypto = require('crypto')



//register user - api/v1/register
exports.registerUser = catchAsyncError(async (req,res,next) => {
    
    const {name,email,password} = req.body

    let avatar;
    if(req.file){
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`;
        //req.protocol gets the protocol used (http or https)
        //req.get('host') gets the host name (domain or localhost)
    }
    // else{
    //     avatar = `${req.protocol}://${req.get('host')}/uploads/user/default_avatar.png`;
    //     //if no avatar is uploaded, use a default avatar
    // }
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 201, res)
})



//login user - api/v1/login
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


//logout user - api/v1/logout
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



//forgot password - api/v1/password/forgot
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



//reset password - api/v1/password/reset/:token
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



//get user profile - api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req,res,next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})


//change password - api/v1/password/change
exports.changePassword = catchAsyncError(async (req, res, next) => {
     const user = await User.findById(req.user.id).select('+password');
     //select('+password') is used to include the password field in the user object

     if (!await user.isValidPassword(req.body.oldPassword)) {
         return next(new ErrorHandler('Old password is incorrect', 401));
     }

     user.password = req.body.password;
     await user.save();
     res.status(200).json({
         success: true
     });
})


//update profile - api/v1/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        user
    });
})



//admin routes
//get all users - api/v1/admin/users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
})



//get specific user - api/v1/admin/users/:id
exports.getSpecificUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    });
});



//update user - api/v1/admin/users/:id
exports.updateUser = catchAsyncError (async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role 
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        user
    });
})



//delete user - api/v1/admin/users/:id
exports.deleteUser = catchAsyncError(async (req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with this id: ${req.params.id}`))
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true
    })
})