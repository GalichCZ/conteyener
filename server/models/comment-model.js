const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment_date: Date,
  comment_text: String,
  comment_creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment_item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
