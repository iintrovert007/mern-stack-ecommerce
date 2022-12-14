const mongoose = require('mongoose');
const validator = require('validator');

const  userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        maxlength: [30, 'Name cannot exceed 30 characters']
    },
    email:{
        type: String,
        required: [true, 'Please enter email '],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email addres']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        maxlength: [6, 'Password cannot exceed 6 characters'],
        select: false
    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date 
});
let schema = mongoose.model('User', userSchema);
module.exports = schema;