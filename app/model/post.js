const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  id: { type: String },
});

const post = new mongoose.model("post", PostSchema);

module.exports = post;
