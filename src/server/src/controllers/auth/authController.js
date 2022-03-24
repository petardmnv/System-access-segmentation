const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../../models/user.js');
const { comparePassword } = require('./comparePassword.js');
const AppError = require('../../utils/appError.js');

module.exports = {
    register: async (req, res, next) => {
        let { username, email, password } = req.body;
        try {
            // Save user to db. THere is no need for middleware validation for
            // username and email because validations are defined in the schema 
            const user = await User.create({
                username: username,
                email: email,
                password: password
            });

            // If something went wrong with saving user then return error
            if (!user) return next(new AppError("Unable to register", 401));

            // Remove user from db if jwt token generation fails
            let token = {};
            try {
                token = await user.generateAuthToken();
            } catch (error) {
                // Remove user from db if jwt token generation fails
                await User.deleteOne({ username });
                next(new AppError(error.message, 401));
            }

            //Create response object for success scenario
            let respObj = { "id": user._id, "username": user.username, "email": user.email };
            res.status(200).send({ token: token, user: respObj });

        } catch (error) {
            next(new AppError(error.message, 400));
        }
    },
    login: async (req, res, next) => {
        let { username, email, password } = req.body;
        try {
            // find user with provided data
            const user = await User.findByCredentials(username, email);

            // Compare provided password with that stored in the db
            await comparePassword(password, user.password);

            //Create response object for success scenario
            let respObj = { "id": user._id, "username": user.username, "email": user.email };
            res.status(200).send({ user: respObj });

        } catch (error) {
            next(error);
        }
    }
};