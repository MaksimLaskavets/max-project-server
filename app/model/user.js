const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Enter email"],
    unique: [true, "Duplicate"],
    validate: [isEmail, "Enter validate email addres"],
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});
const user = new mongoose.model("User", UserSchema);

module.exports = user;
