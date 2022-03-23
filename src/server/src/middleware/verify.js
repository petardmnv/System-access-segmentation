// Verify user credentials like username or email
const User = require('../models/user.js');

module.exports = {
    checkDublicateUsername: async(req, res, next) => {
        try {
            let username = await User.find({ username: req.body.username }).exec();
            if (username) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }
            next();
        } catch (error) {
            res.status(500).send({ message: error });
        }
    },
    checkDublicateEmail: async (req, res, next) => {
        try {
            let email = await User.find({ email: req.body.email }).exec();
            if (email) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }
            next();
        } catch (error) {
            res.status(500).send({ message: error });
        }
    }
};


