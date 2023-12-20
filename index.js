const express = require("express");;
const cors = require("cors");
const websiteRoutes = require("./src/routes/websiteRoutes");
require("dotenv").config();
require("./src/config/db");
const app = express()
const PORT = process.env.PORT | 8000;

app.use(cors());
app.use(express.json());

app.use("/", websiteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
