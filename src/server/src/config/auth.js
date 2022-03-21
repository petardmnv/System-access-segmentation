const dotenv = require('dotenv');
dotenv.config({path: './.env'});
module.exports = {
    secret: process.env.JWTSECRET
};