// export .env propreties so then thay can be called in simpler way 
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
module.exports = {
  port: process.env.PORT
};