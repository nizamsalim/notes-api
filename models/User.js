const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  phone: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = new mongoose.model("users", UserSchema);
