import mongoose from "mongoose";

// Create model which has its data schema for User information in the site
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    })
);
module.exports = User;