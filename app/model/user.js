const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter validate email addres"],
  },
  name: { type: String, required: [true, "Please enter a name"] },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "The password should be at least 6 characters long"],
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const user = new mongoose.model("user", UserSchema);

module.exports = user;
