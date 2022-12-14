const catchAsyncError = require('../middlewares/catchAsyncErrors');
const User =  require('../models/userModel');
const sendToken = require('../utils/jwt')
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
