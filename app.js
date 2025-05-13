const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4040;
const pool = require("./src/config/db");

const app = express();

//CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

//middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/products", require("./src/routes/product"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
