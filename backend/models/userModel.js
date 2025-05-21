const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        maxlength: [6, 'Password should be less than 6 characters'],
        select: false
    },
    avatar: {
            type: String,
            required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10)
})



let model = mongoose.model('User', userSchema);
module.exports = model;
//added test comment to check git