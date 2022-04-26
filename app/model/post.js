const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true },
  body: { type: String, required: true },
  //   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  id: { type: String },
});

const post = new mongoose.model("Post", PostSchema);

module.exports = post;
