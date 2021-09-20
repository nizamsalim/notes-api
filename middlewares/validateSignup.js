const User = require("../models/User");

const validateSignup = async (req, res, next) => {
  const { name, username, phone, email, password } = req.body;
  if (!name || !username || !phone || !email || !password) {
    return res.status(400).json({ success: false, error: "Invalid inputs" });
  }
  // validation checks
  const usernameExists = await User.findOne({ username: username });
  const emailExists = await User.findOne({ email: email });
  const emailIsValid = validateEmail(email);
  const passwordIsValid = password.length > 6 ? true : false;
  const phoneIsValid = validatePhone(phone);

  function validateEmail(emailInput) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailInput).toLowerCase());
  }
  function validatePhone(phoneInput) {
    const re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    return re.test(String(phoneInput));
  }

  if (usernameExists) {
    return res
      .status(400)
      .json({ success: false, error: "Username is already taken" });
  }
  if (emailExists) {
    return res
      .status(400)
      .json({ success: false, error: "Email is already taken" });
  }
  if (!emailIsValid) {
    return res
      .status(400)
      .json({ success: false, error: "Email is not valid" });
  }
  if (!passwordIsValid) {
    return res.status(400).json({
      success: false,
      error: "Password should contain more than 6 characters",
    });
  }
  if (!phoneIsValid) {
    return res
      .status(400)
      .json({ success: false, error: "Phone number is not valid" });
  }
  next();
};
module.exports = validateSignup;
