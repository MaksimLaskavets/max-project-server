const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter email"],
  },
  body: { type: String, required: true },
});
const comment = new mongoose.model("Comment", CommentSchema);

module.exports = comment;
