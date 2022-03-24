const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saltRounds } = require('../config/salt.js');
const { secret } = require('../config/auth.js');
const AppError = require('../utils/appError.js')

// Create model which has its data schema for User information in the site
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!value) {
                throw new Error('Username is invalid');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

// Instanse available function for creating authorization token - JWT
userSchema.methods.generateAuthToken = async function () {
    // generate token. Get user id from mongo collection and add it to the token payload
    const token = await jwt.sign({ id: this._id.toString() }, secret, { expiresIn: "2 days" });
    return token;
}

// Model available function for authenticationg user by given credentials
userSchema.statics.findByCredentials = async function (username, email) {
    // Get user by providing username or email
    let userData = null;
    if (!username) {
        userData = await User.findOne({ email });
    }
    else {
        userData = await User.findOne({ username });
    }

    // check if data is empty 
    if (!userData) {
        throw new AppError("Unable to login.", 401);
    }

    // if everything passes return data for the current user
    return userData;
}

// Add middleware to the data collection - like hashing password method
// We need to hash the password before an event like save() occurs
// so I will use build in pre() function that will execute this method before a save event occurs
userSchema.pre('save', async function (next) {
    //this is reference to the documenta that we are modifying via save event
    // isModified(attr) is used to check if the password is modified. If it's not then i don't need
    // to hash it again
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

const User = mongoose.model(
    "User", userSchema
);
module.exports = User;