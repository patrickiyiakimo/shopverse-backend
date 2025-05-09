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
app.use("/register", require("./src/routes/signup/registerRoutes"));
app.use("/login", require("./src/routes/signup/loginRoutes"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
