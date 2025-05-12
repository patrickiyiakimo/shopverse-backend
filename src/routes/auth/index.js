const express = require('express');
const router = express.Router();

const loginRoutes = require('./loginRoutes');
const registerRoutes = require('./registerRoutes');

router.use(loginRoutes);
router.use(registerRoutes);

module.exports = router;