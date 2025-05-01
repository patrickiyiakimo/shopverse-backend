const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../config/db");
require("dotenv").config();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginUser };