const User = require("../models/User");

const validateSignup = async (req, res, next) => {
  const { name, username, phone, email, password } = req.body;
  if (!name || !username || !phone || !email || !password) {
    return res.json({ success: false, error: "Invalid inputs" });
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
    return res.json({
      success: false,
      error: {
        status: 400,
        code: "val/un-tkn",
        message: "Username is already taken",
      },
    });
  }
  if (emailExists) {
    return res.json({
      success: false,
      error: {
        status: 400,
        code: "val/em-ex",
        message: "Email already exists",
      },
    });
  }
  if (!emailIsValid) {
    return res.json({
      success: false,
      error: {
        status: 400,
        code: "val/em-inv",
        message: "Email is invalid",
      },
    });
  }
  if (!passwordIsValid) {
    return res.json({
      success: false,
      error: {
        status: 400,
        code: "val/pwd-len",
        message: "Password should be atleast 6 characters long",
      },
    });
  }
  if (!phoneIsValid) {
    return res.json({
      success: false,
      error: {
        status: 400,
        code: "val/ph-inv",
        message: "Phone is in invalid format",
      },
    });
  }
  next();
};
module.exports = validateSignup;
