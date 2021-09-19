const mongoose = require("mongoose");
const DB_URI =
  process.env.DB_URI ||
  "mongodb+srv://root:root@cluster0.cfujj.mongodb.net/notesapi?retryWrites=true&w=majority";

module.exports = () => {
  mongoose.connect(DB_URI, () => {
    console.log("Database connected");
  });
};
