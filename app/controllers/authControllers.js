import User from "../model/user.js";

const alertError = (err) => {
  let errors = { name: "", userName: "", password: "", email: "" };
  //   console.log(`error message: ${err.message}`);
  //   console.log(`error code: ${err.code}`);
  if (err.code === 11000) {
    errors.email = "This email is alredy registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export const signup = async (req, res) => {
  const { password, name, userName, email } = req.body;
  try {
    const user = await User.create({ password, name, userName, email });
    res.status(201).json({ user });
  } catch (error) {
    let errors = alertError(error);
    res.status(400).json({ errors });
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};
