const express = require('express');
const router = express.Router();
const {postMessage} = require('../../controllers/messages/messageController');

router.post('/', postMessage);

module.exports = router;