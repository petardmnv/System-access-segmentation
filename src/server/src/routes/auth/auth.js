const express = require('express');
const router = express.Router();
const User = require('../../models/user.js');

router.post('/login', async (req, res) => {
    let {username, email, password} = req.body;
    console.log(username);
    try {
        const user = await User.findByCredentials(username, email, password);
        console.log(`User props: ${user}`);
        res.send(user).status(200);
    } catch (error) {
        console.log("Fuck")
        console.log(error.message)
        res.status(401).send({ message: error.message })
    }
});

module.exports = router;