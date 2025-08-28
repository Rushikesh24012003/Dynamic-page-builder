import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Dummy users (password = username)
const users = {
  admin: { password: "admin", role: "Admin" },
  user: { password: "user", role: "User" },
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const u = users[username];
  if (!u || u.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ username, role: u.role }, process.env.JWT_SECRET || "secret", { expiresIn: "8h" });
  res.json({ token, role: u.role });
});

export default router;
