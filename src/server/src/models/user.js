const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');

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

userSchema.statics.findByCredentials = async function(username, email, password){
    let userData = null;
    if (!username) {
        userData = await User.findOne({ email });
    }
    else {
        userData = await User.findOne({ username });
    }

    // check if data is empty 
    if (!userData) {
        throw new Error("Unable to login.");
    }

    // compare passwwords
    let isValid = await bcrypt.compare(password, userData.password);

    if (!isValid) {
        throw new Error("Unable to login.");
    }
    // if everything passes return data for the current user
    return userData;
}

// Add middleware to the data collection - like hashing password method
// We need to hash the password before an event like save() occurs
// so I will use build in pre() function that will execute this method before a save event occurs
userSchema.pre('save', async function(next) {
    //this is reference to teh documenta that we are modifying via save event
    // isModified(attr) is used to check if the password is modified. If it's not then i don't need
    // to hash it again
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model(
    "User", userSchema
);
module.exports = User;