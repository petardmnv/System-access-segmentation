import mongoose from "mongoose";

// Create model which has its data schema for User information in the site
const User = mongoose.model(
    "User",
    new mongoose.Schema({
      username: String,
      email: String,
      password: String
    })
  );
  module.exports = User;