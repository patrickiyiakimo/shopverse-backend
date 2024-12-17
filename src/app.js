require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("sequelize");
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const PORT = Process.env.PORT || 2020;

const app = express();

//CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Configure Sequelize connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: true,
  },
});

//Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  SSL: {
    rejectUnauthorized: false,
  },
});

//middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
