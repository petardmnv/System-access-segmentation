const axios = require('axios');

let token = localStorage.getItem("token");

exports.axiosInstance = axios.create({
    headers: {
      Authorization : `Bearer ${token}`
    }
});