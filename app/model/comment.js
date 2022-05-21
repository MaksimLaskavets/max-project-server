import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter email"],
  },
  body: { type: String, required: true },
});
const comment = new model("Comment", CommentSchema);

export default comment;
