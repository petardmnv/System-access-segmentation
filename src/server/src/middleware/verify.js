// Verify user credentials like username or email

import User from '..models/User.js';
module.exports = {
    checkDublicateUsername: (req, res, next) => {
        try {
            let username = await User.find({ username: req.body.username }).exec();
            if (email) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }
            next();
        } catch (error) {
            return res.status(500).send({ message: error });
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
            return res.status(500).send({ message: error });
        }
    }
};


