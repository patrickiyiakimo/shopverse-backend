const db = require("./src/config/db");

const app = require("./app");

app.get("/", (req, res) => {
  res.send("Hello from ShopVerse");
});

app.get("*", (req, res) => {
  res.send("Details Not Found");
});
