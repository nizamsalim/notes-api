const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connectToDatabase = require("./dbConfig");
const cors = require("cors");

connectToDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`API on localhost:${PORT}`);
});
