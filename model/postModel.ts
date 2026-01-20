import mongoose from "mongoose";

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
  sender_id: {
    type: Number,
    required: false,
  },
});

export default mongoose.model("Post", postSchema); // Post is the name of the collection in the database