const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});
const user = new mongoose.model("User", UserSchema);

module.exports = user;
