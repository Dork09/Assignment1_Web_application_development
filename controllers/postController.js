const Post = require("../model/postModel.js");

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
    const postId = Number(req.params.post_id);

    if (Number.isNaN(postId)) {
      return res.status(400).json({ error: "post_id must be a number" });
    }

    const post = await Post.findOne({ post_id: postId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json(post);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const createPost = async (req, res) => {
  const obj = req.body;
  try {
    const res = await Post.create(obj);
    res.status(201).json(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = Number(req.params.post_id);

    if (!Number.isInteger(postId)) {
      return res.status(400).json({ error: "post_id must be a number" });
    }

    // החלפה/עדכון של שדות לפי מה שנשלח ב-body
    const updated = await Post.findOneAndUpdate(
      { post_id: postId },
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
    const postId = Number(req.params.post_id);

    if (!Number.isInteger(postId)) {
      return res.status(400).json({ error: "post_id must be a number" });
    }

    const deleted = await Post.findOneAndDelete({ post_id: postId });

    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPost,
  getPostById,
  createPost,
  updatePost,
  deletePost
};