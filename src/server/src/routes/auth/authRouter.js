const express = require('express');
const router = express.Router();
const User = require('../../models/user.js');
const { register, login } = require('../../controllers/auth/authController.js');
const { protectRoute } = require('../../middleware/jwtAuth.js');

router.post('/login', login);

router.post('/register', register);

router.get('/pipeline', protectRoute, (req, res) => {
    res.status(200).send(req.user);
});

module.exports = router;