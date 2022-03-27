const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../../models/user.js');
const { comparePassword } = require('./comparePassword.js');
const AppError = require('../../utils/appError.js');
const { secret, tokenExpiration, cookieExpiration, nodeEnv} = require('../../config/auth.js');

// Function for creating and sending authorization token - JWT
const createSendToken = async (user, code, res) => {
    // I will add this to res.cookie params
    let cookieOptions= {
        expires: new Date(Date.now() + cookieExpiration * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    // If the project is in production state than add secure param to true 
    // (bassicly secure claims that we must use https) 
    if (nodeEnv === 'production') cookieOptions.secure = true;

    let token;
    try {
        // generate token. by given user id and add it to the token payload
        token = jwt.sign({ id: user._id.toString() }, secret, { expiresIn:  tokenExpiration});
        // send token into cookie 
        // set expires param and convert .env variable into milliseconds
        res.cookie('jwt', token, cookieOptions).status(code).send({token: token, _id: user._id, username: user.username, email: user.email});
    } catch (error) {
        throw new AppError("Cannot sign jwt token.", 401);
    }
}

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
            if (!user) return next(new AppError("Unable to save user into db. Try again", 500));

            // Remove user from db if jwt token generation fails
            try {
                createSendToken(user, 200, res);
            } catch (error) {
                // Remove user from db if jwt token generation fails
                await User.deleteOne({ username });
                return next(new AppError(error.message, 401));
            }
        } catch (error) {
            return next(new AppError("Username or email already exists.", 500));
        }
    },
    login: async (req, res, next) => {
        let { username, email, password } = req.body;
        try {
            // find user with provided data
            const user = await User.findByCredentials(username, email);
            try {
                // Compare provided password with that stored in the db
                await comparePassword(password, user.password);   
            } catch (error) {
                return next(new AppError(error.message, 401));
            }
            createSendToken(user, 200, res);
        } catch (error) {
            return next(new AppError(error.message, 500));
        }
    }
};