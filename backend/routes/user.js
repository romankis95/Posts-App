const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post("/signup", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 10)
        .then(hash => {

    const user = new User({
        email: email,
        password: hash
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User created!",
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            message: "Invalid authentication credentials!"
        });
    });
});
});

module.exports = router;