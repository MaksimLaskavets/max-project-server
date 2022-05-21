import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

const post = new model("post", PostSchema);

export default post;
