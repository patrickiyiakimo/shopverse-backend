require('dotenv').config();
const db = require('./config/db');

const app = require('./app');

app.get('/', (req, res) => {
    res.send('Hello from ShopVerse');
});

app.get('*', (req, res) => {
    res.send('Resources Not Found');
});