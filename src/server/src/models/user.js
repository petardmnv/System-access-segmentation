const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saltRounds } = require('../config/salt.js');
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
    },
    passwordChangedAt: Date
});

// Method that will check if user have changed his password after token initialization.
// Will be used in middleware jwt verification
userSchema.methods.changedPasswordAfterTokenGeneration = function(tokenCreatedAt) {
    // Every user has property changedPasswordAt which will be
    // available if the current user changed his pass. If not then 
    // user didn't changed his pass
    // So i this prop exists then we need to compare the timestamps
    if (this.passwordChangedAt) {
        // The result from .getTime is in milliseconds so i need to deivde it by 1000
        // so that i can compare it with tokenCreatedAt
        const changeToTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return tokenCreatedAt < changeToTimestamp;
    }
    return false;
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