import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_id: { type: Number, required: true, unique: true, index: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // Auth
    password_hash: { type: String, required: true },
    refresh_token_hash: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
