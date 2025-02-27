// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 2020;

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
app.use("/register", require("./routes/registerUser"));
app.use("/login", require("./routes/loginUser"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
