const User = require("../model/user");

exports.signup = async (req, res) => {
  const { password, lastName, firstname } = req.body;
  try {
    const user = await User.create({ password, lastName, firstname });
    res.status(201).json({ user });
  } catch (error) {}
};

exports.login = (req, res) => {
  res.send("login");
};

exports.logout = (req, res) => {
  res.send("logout");
};
