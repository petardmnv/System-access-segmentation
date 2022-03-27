const dotenv = require('dotenv');
dotenv.config({path: './.env'});
module.exports = {
    secret: process.env.JWT_SECRET,
    tokenExpiration: process.env.TOKEN_EXPIRATION,
    cookieExpiration: process.env.COOKIE_EXPIRATION,
    nodeEnv: process.env.NODE_ENV
};