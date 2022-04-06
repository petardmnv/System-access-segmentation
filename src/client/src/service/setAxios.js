const axios = require('axios');

let token = localStorage.getItem("token");

exports.axiosInstance = axios.create({
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer: ${token}`,
    }
});