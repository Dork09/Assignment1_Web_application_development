import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment_id: {
    type: Number,
    required: true,
    unique: true,
  },
  post_id: {
    type: Number,
    required: true,
  },
  user_id:{
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    required: true,
  }
});

export default mongoose.model("Comment", commentSchema); // Comment is the name of the collection in the database