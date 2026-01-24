import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  url_image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: false,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: false,
  },
});

export default mongoose.model("Post", postSchema); // Post is the name of the collection in the database