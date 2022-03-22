const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
import User from '..models/User.js';

module.exports = {
    hashPassword: async (password) => {
        try {
            return hashedPassword = await bcrypt.hash(password, 8);
        } catch (error) {
            // Maybe it is clever to throll exeption and handle it in routes
            console.log(error);
            return;
        }
    },
    register: async (req, res) => {
        try {
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword(req.body.password)
            });
            if (user) res.send({ message: "User registered successfully!" });
        } catch (error) {
            res.status(500).send({ message: error });
        }
    }
};