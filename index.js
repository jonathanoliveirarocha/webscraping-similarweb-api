const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/db");
const PORT = process.env.PORT | 8000;

app.get("/", (req, res) => {
  res.send("Rodando!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
