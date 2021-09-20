const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validateSignup = require("../middlewares/validateSignup");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Ghw7^$8nch@*#7Hfb&40=#8B6472hBgf73";

const encryptPassword = async (textPwd) => {
  const salt = await bcyrpt.genSalt(10);
  const pwdHash = await bcyrpt.hash(textPwd, salt);
  return pwdHash;
};

// ROUTE 1 - SIGNUP
// POST /auth/signup

router.post("/signup", validateSignup, async (req, res) => {
  try {
    const { name, username, phone, email, password } = req.body;
    const pwdHash = await encryptPassword(password);
    const user = await User.create({
      name,
      username,
      phone,
      email,
      password: pwdHash,
    });
    let newUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      phone: user.phone,
      email: user.email,
    };
    let tokenData = {
      id: user._id,
    };
    let authToken = jwt.sign(tokenData, JWT_SECRET);
    res.json({ success: true, user: newUser, authToken });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ROUTE 2 - LOGIN
// POST /auth/login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Account does not exist" });
    }
    let passwordMatches = await bcyrpt.compare(password, user.password);
    if (!passwordMatches) {
      return res
        .status(400)
        .json({ success: false, error: "Password is incorrect" });
    }
    let tokenData = {
      id: user._id,
    };
    let loggedInUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
      phone: user.phone,
      email: user.email,
    };
    let authToken = jwt.sign(tokenData, JWT_SECRET);
    res.json({ success: true, authToken, user: loggedInUser });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
