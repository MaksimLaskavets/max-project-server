import mongoose from "mongoose";
import isEmail from "validator";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
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

const user = new model("user", UserSchema);

export default user;
