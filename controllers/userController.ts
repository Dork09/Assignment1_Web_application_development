import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

async function nextUserId(): Promise<number> {
  const count = await User.countDocuments();
  return count + 1;
}

const createUser = async (req: any, res: any) => {
  try {
    const { username, email, password_hash } = req.body;
    if (!username || !email || !password_hash) {
      return res.status(400).json({ message: "username, email, password_hash are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists" });

    const password = await bcrypt.hash(password_hash, 10);

    const user = await User.create({
      user_id: await nextUserId(),
      username,
      email,
      password_hash:password,
    });

    // לא מחזירים סיסמה/רפרש החוצה
    return res.status(201).json({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const getUsers = async (_req: any, res: any) => {
  try {
    const users = await User.find().select("user_id username email");
    return res.json(users);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req: any, res: any) => {
  try {
    const user = await User.findOne({ user_id: Number(req.params.user_id) }).select("user_id username email");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req: any, res: any) => {
  try {
    const updated = await User.findOneAndUpdate(
      { user_id: Number(req.params.user_id) },
      req.body,
      { new: true }
    ).select("user_id username email");

    if (!updated) return res.status(404).json({ message: "User not found" });
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req: any, res: any) => {
  try {
    const deleted = await User.findOneAndDelete({ user_id: Number(req.params.user_id) });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
