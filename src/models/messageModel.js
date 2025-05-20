const db = require('../config/db');


const createMessage = async ({subject, email, message}) => {
    const result = await db.query(
        'INSERT INTO messages (subject, email, message) VALUES ($1, $2, $3) RETURNING *',
        [subject, email, message]
    );
    return result.rows[0];
};

module.exports = {createMessage}