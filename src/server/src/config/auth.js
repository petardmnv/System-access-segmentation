const dotenv = require('dotenv');
dotenv.config({path: './.env'});
module.exports = {
    secret: process.env.JWTSECRET,
    tokenExpiration: process.env.TOKENEXPIRATION,
    cookieExpiration: process.env.COOKIEEXPIRATION,
    nodeEnv: process.env.NODE_ENV
};