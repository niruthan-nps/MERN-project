const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
            type: String
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

// userSchema.pre('save', async function(next){
//     this.password = await bcrypt.hash(this.password, 10)
// })

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // only hash if password is modified
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
    
}

 userSchema.methods.isValidPassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
 }

 userSchema.methods.getResetToken = function() {
    const token = crypto.randomBytes(20).toString('hex');//generate token
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');//geneerate hash of token
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; //30 minutes in milliseconds
    return token; //return the plain token to send to user via email
 }



let model = mongoose.model('User', userSchema);
module.exports = model;
//added test comment to check git