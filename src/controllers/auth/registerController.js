const bcrypt = require("bcrypt");
const pool = require("../../config/db");
require("dotenv").config();
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { first_name, last_name, email, password} = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'first_name, last_name, email, and password are required' });
    }

    // Check for duplicate email
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
        return res.sendStatus(400).json({ message: 'Email already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, email, hashedPassword]
        );
        const user = result.rows[0];

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.sendStatus(201).json({ message: 'User signed up successfully', token });
    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser };
