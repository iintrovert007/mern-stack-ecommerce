const crypto = require('crypto')
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const User =  require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt')
const sendEmail = require('../utils/mail')
exports.registerUser = catchAsyncError(async (req, res, next)=>{
    const {name, email, password, avatar} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar
    })
    sendToken(user, 200, res)
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body;

    //checking email & password is received
    if(!email || !password) {
        return next(new Error('Please enter email & password', 400))
    }

    //finding the user in database
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return  next(new Error('Invalid email or password', 401))
    }

    if(!user.isValidPassword(password)) {
        return  next(new Error('Invalid email or password', 401))
    }

    sendToken(user, 200, res)

})


exports.logoutUser = (req, res, next) => {
    res.cookie('token', null,
        {
            expires: new Date(Date.now()),
            httpOnly: true
        }
    );

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}

exports.forgotPassword = catchAsyncError(async (req, res, next)=>{
    const user = await User.findOne({email: req.body.email})

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    const resetToken = user.getResetToken();

    await user.save({validateBeforeSave: false})

    //Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const  message = `Your password reset token is as follow \n\n ${resetUrl} \n\n 
    If you have not requested this email, then ignore it.`;

    try{
        sendEmail({
            email: user.email,
            subject: "JVLcart Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false})
        return next(new ErrorHandler(error.message, 500))
    }

})


exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne(
        {
            resetPasswordToken,
            resetPasswordTokenExpire:{
                $gt:Date.now()
            }
    })

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired'))
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match'))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})

    sendToken(user, 200, res)

})
