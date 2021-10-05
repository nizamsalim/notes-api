const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connectToDatabase = require("./dbConfig");
const cors = require("cors");

connectToDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  let html =
    '<div style="display: flex;justify-content: center;align-items: center;height:92vh" >\
        <h1 style="font-size:3rem;text-align:center" >Please refer documentation <br> for list of endpoints</h1>\
     </div>';
  res.send(html);
});

app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`API on localhost:${PORT}`);
});
