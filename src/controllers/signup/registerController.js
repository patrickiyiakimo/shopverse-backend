const bcrypt = require("bcrypt");
const pool = require("../../config/db");
require("dotenv").config();
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'equired' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        const user = result.rows[0];
        const token = jwt.sign({ id: user.id, username: user.username }, 'my_jwt_secret', { expiresIn: '1h' });

        res.sendStatus(201).json({ message: 'User signed up successfully', token });
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser };