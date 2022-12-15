const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return next(new ErrorHandler('Login first to hande this resource.', 401 ))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = User.findById(decoded.id)
    next();
    
})