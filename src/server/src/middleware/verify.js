// Verify user credentials like username or email

import User from '..models/User.js';
module.exports = {
    checkDublicateUsername: (req, res, next) => {
        User.find({ username: req.body.username }, function (err, docs) {
            if (err) {
                return res.status(500).send({ message: err });
            }
            if (docs) {
                return res.status(400).send({ message: "Failed! Username is already in use!" });
            }
            next();
        });
    },
    checkDublicateEmail: (req, res, next) => {
        User.find({ email: req.body.email }, function (err, docs) {
            if (err) {
                return res.status(500).send({ message: err });
            }
            if (docs) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }
            next();
        });
    }   
};


