const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../../models/user.js');
const { comparePassword } = require('./comparePassword.js')

module.exports = {
    register: async (req, res) => {
        let { username, email, password } = req.body;
        try {
            const user = await User.create({
                username: username,
                email: email,
                password: password
            });
            if (!user) res.status(400).send({ message: "Unable to register." });

            // Remove user from db if jwt token generation fails
            let token = {};
            try {
                token = await user.generateAuthToken();
            } catch (error) {
                await User.deleteOne({ username });
                res.status(400).send({ message: error.message });
            }
            res.status(200).send({ token: token, user: user });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    login: async (req, res) => {
        let { username, email, password } = req.body;
        try {
            const user = await User.findByCredentials(username, email, password);
            await comparePassword(password, user.password);
            res.status(200).send(user);
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    }
};