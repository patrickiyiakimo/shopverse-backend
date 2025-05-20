const db = require('../../config/db');
const {createMessage} = require('../../models/messageModel');

const sendMessage = async (req, res) => {
    const {subject, email, message} = req.body;

    if(!subject || !email || !message) {
        return res.status(400).json({error: 'All fields are required'});
    }
    try {
        const newMessage = await createMessage({subject, email, message});
        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {sendMessage};