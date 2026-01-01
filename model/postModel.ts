export {};
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  post_id: {
    type: Number,
    required: true,
     unique: true,
  },
});

module.exports = mongoose.model("Post", postSchema); // Post is the name of the collection in the database