const AppError = require("../utils/appError");

modeule.exports = {
    protectRoute: async (req, _, next) => {
        // Get the auth ktoken from Authorization Header from the request
        // Structure Authorization: Bearer <JWT token>
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(new AppError("Unable to get authorization token", 401));
        }
    }
};