const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { secret } = require('../config/auth.js');
const User = require('../models/user.js')

module.exports = {
    protectRoute: async (req, res, next) => {
        // First approach is to get the auth token from Authorization Header from the request
        // Second approach is to get the auth token from cookie
        // Structure Authorization: Bearer <JWT token>
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next(new AppError("Unable to get authorization token", 401));
        }
        // Verify token 
        let decodedToken;
        try {
            decodedToken = await jwt.verify(token, secret);
        } catch (error) {
            return next(new AppError("Corrupted jwt token", 401));
        }

        // Ckeck if user who has his id writen into the token exists
        const currentUser = await User.findById(decodedToken.id);
        if (!currentUser) {
            return next(new AppError("User who belongs to this token no longer exists.", 401));
        }

        // check if user changed his pass after token was generated
        if (currentUser.changedPasswordAfterTokenGeneration(decodedToken.iat)) {
            return next(new AppError("User who belongs to this token has changed his password after generation of the token.", 401));
        }

        // If all checks passed then give current user data to the req and call next()
        let currentUserData = { id: currentUser._id, username: currentUser.username, email: currentUser.email }

        req.user = currentUserData;
        next();
    }
};