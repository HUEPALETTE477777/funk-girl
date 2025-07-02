const express = require('express');
const User = require('../models/UserModel');

const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({
            message: "USER CREATED SUCCESSFULLY",
            user: user,
        });
    } catch (error) {
        res.status(500).json({ error })
    }
})



module.exports = router;
