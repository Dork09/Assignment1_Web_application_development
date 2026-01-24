import Post from "../model/postModel.js";
import mongoose from "mongoose";

const getPost = async (req, res) => { 
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.post_id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid post_id format" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    // MongoDB will automatically generate _id (ObjectId)
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.post_id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid post_id format" });
    }

    // החלפה/עדכון של שדות לפי מה שנשלח ב-body
    const updated = await Post.findByIdAndUpdate(
      postId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.post_id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid post_id format" });
    }

    const deleted = await Post.findByIdAndDelete(postId);

    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export {
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost
};