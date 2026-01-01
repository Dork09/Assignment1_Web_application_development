export {};
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment_id: {
    type: Number,
    required: true,
  },
  post_id: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Comment", commentSchema); // Comment is the name of the collection in the database