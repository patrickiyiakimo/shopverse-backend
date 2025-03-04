const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const registerController = require("../controllers/registerController");

router.post("/", registerController.registerUser);

module.exports = router;
