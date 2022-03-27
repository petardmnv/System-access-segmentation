const dotenv = require('dotenv');
dotenv.config({path: './.env'});
module.exports = {
    name: process.env.DBNAME,
    pwd: process.env.MPWD
};