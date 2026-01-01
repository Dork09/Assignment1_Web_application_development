export {};
const Comment = require("../model/commentModel");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.json(comments);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET /comment/:post_id
// מחזיר את כל התגובות של פוסט לפי post_id מספרי
const getCommentsByPostId = async (req, res) => {
  try {
    const postId = Number(req.params.post_id);

    if (!Number.isInteger(postId)) {
      return res.status(400).json({ error: "post_id must be a number" });
    }

    const comments = await Comment.find({ post_id: postId });
    return res.json(comments);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// POST /comment
// יצירת תגובה חדשה
const createComment = async (req, res) => {
  try {
    const { comment_id, post_id, comment } = req.body;

    if (!Number.isInteger(comment_id)) {
      return res.status(400).json({ error: "comment_id must be a number" });
    }
    if (!Number.isInteger(post_id)) {
      return res.status(400).json({ error: "post_id must be a number" });
    }
    if (!comment || typeof comment !== "string") {
      return res.status(400).json({ error: "comment is required" });
    }

    // הגנה על כפילות comment_id
    const exists = await Comment.findOne({ comment_id });
    if (exists) {
      return res.status(409).json({ error: "comment_id already exists" });
    }

    const newComment = await Comment.create({ comment_id, post_id, comment });
    return res.status(201).json(newComment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// PUT /comment/:comment_id
// עדכון תגובה לפי comment_id מספרי
const updateComment = async (req, res) => {
  try {
    const commentId = Number(req.params.comment_id);

    if (!Number.isInteger(commentId)) {
      return res.status(400).json({ error: "comment_id must be a number" });
    }

    const updated = await Comment.findOneAndUpdate(
      { comment_id: commentId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE /comment/:comment_id
// מחיקת תגובה לפי comment_id מספרי
const deleteComment = async (req, res) => {
  try {
    const commentId = Number(req.params.comment_id);

    if (!Number.isInteger(commentId)) {
      return res.status(400).json({ error: "comment_id must be a number" });
    }

    const deleted = await Comment.findOneAndDelete({ comment_id: commentId });

    if (!deleted) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getComments,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment
};