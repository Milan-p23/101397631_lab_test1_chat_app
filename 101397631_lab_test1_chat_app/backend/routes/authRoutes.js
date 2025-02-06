const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
    try {
        let { username, firstname, lastname, password } = req.body;

        
        username = username.toLowerCase();

 
        if (!username || !firstname || !lastname || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

    
        if (username.length < 3) {
            return res.status(400).json({ error: "Username must be at least 3 characters" });
        }

       
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

       
        const existingUser = await User.findOne({ username: { $regex: `^${username}$`, $options: 'i' } });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken" });
        }

       
        const newUser = new User({ username, firstname, lastname, password });

       
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;

       
        username = username.toLowerCase();

        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.json({ message: "Login successful!", username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
