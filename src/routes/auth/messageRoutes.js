const express = require('express');
const router = express.Router();
const {postMessage} = require('../../controllers/auth/messageController');

router.post('/', postMessage);

module.exports = router;