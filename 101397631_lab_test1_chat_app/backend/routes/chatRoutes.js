const express = require('express');
const GroupMessage = require('../models/GroupMessage');
const PrivateMessage = require('../models/PrivateMessage');

const router = express.Router();


router.get('/messages/:room', async (req, res) => {
    try {
        const messages = await GroupMessage.find({ room: req.params.room }).sort('date_sent');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/private/:from_user/:to_user', async (req, res) => {
    try {
        const messages = await PrivateMessage.find({
            $or: [
                { from_user: req.params.from_user, to_user: req.params.to_user },
                { from_user: req.params.to_user, to_user: req.params.from_user }
            ]
        }).sort('date_sent');
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
