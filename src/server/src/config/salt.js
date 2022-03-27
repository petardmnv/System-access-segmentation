const dotenv = require('dotenv');
dotenv.config({path: './.env'});
module.exports = {
    saltRounds: parseInt(process.env.SALT, 10)
};