const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const registerController = require("../controllers/signup/registerController");

router.post("/", registerController.registerUser);

module.exports = router;
