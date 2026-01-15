const express = require('express');
const user = require('../models/user');
const router = express.Router();

router.post('/', async (req, res) => {
    
    try {
        const newUser = new user(req.body);
        const saved = await newUser.save();
        res.json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

module.exports = router;
