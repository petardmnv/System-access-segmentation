const dotenv = require('dotenv');
dotenv.config({path: './.env'});
module.exports = {
    secret: process.env.JWT_SECRET,
    tokenExpiration: process.env.TOKEN_EXPIRATION,
    cookieExpiration: parseInt(process.env.COOKIE_EXPIRATION, 10),
    nodeEnv: process.env.NODE_ENV
};