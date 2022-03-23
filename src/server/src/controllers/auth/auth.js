const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../../models/user.js');

module.exports = {
    register: async (req, res) => {
        let {username, email, password} = req.body;
        try {
            const user = await User.create({
                username: username,
                email: email,
                password: password
            });
            if (!user) res.status(400).send({ message: "Unable to register." });
            res.send({ message: "User registered successfully!" });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    login: async (req, res) => {
        let {username, email, password} = req.body;
        try {
            const user = await User.findByCredentials(username, email, password);
            res.status(200).send(user);
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    }
};