import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// עוזרים לייצר טוקנים
function signAccessToken(user_id: number) {
  return jwt.sign({ sub: user_id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

function signRefreshToken(user_id: number) {
  return jwt.sign({ sub: user_id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

// POST /auth/login
const login = async (req: any, res: any) => {
  try {
    const { email, password_hash } = req.body;

    // ולידציה
    if (!email || !password_hash) {
      return res.status(400).json({ message: "email and password are required" });
    }

    // למצוא משתמש לפי אימייל
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // להשוות סיסמה (password plaintext) מול hash ששמור ב-DB
    const ok = await bcrypt.compare(password_hash, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ליצור access + refresh
    const accessToken = signAccessToken(user.user_id);
    const refreshToken = signRefreshToken(user.user_id);

    // לשמור refresh ב-DB כ-hash (כדי שאפשר יהיה לבטל אותו ב-logout)
    user.refresh_token_hash = await bcrypt.hash(refreshToken, 10);
    await user.save();

    //  להחזיר טוקנים
    return res.status(200).json({ accessToken, refreshToken, user_id: user.user_id, username: user.username, email: user.email, success: true });
  } catch (err: any) {
    return res.status(500).json({ message: err.message, success: false });
  }
};


// POST /auth/logout
const logout = async (req: any, res: any) => {
  try {
    const { refreshToken } = req.body;

    // חייבים refreshToken
    if (!refreshToken) {
      return res.status(400).json({ message: "refreshToken is required" });
    }

    // אימות refresh token
    let payload: any;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      // גם אם הטוקן לא תקין/פג תוקף — מבחינת logout אפשר להחזיר 204
      return res.status(204).send();
    }

    const user_id = Number(payload.sub);
    if (!Number.isFinite(user_id)) {
      return res.status(204).send();
    }

    // ביטול הסשן: מוחקים את ה-hash ששמור ב-DB
    await User.updateOne(
      { user_id },
      { $set: { refresh_token_hash: null } }
    );

    // הצלחה
    return res.status(204).send();
  } catch (err: any) {
    // logout הוא פעולה "בטוחה" — גם במקרה תקלה אפשר להחזיר 204 כדי לא לחשוף מידע
    return res.status(204).send();
  }
};
export { login, logout };


