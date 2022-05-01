const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter validate email addres"],
  },
  name: { type: String, required: [true, "Please enter a name"] },
  userName: { type: String, required: [true, "Please enter a userName"] },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "The password should be at least 6 characters long"],
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});
const user = new mongoose.model("user", UserSchema);

module.exports = user;
