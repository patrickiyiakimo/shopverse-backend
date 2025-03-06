const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../config/db");
require("dotenv").config();


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.sendStatus(401).json({ message: "Invalid email or password" });
    }
    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, "my_jwt_secret", { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginUser };
