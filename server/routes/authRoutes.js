import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js"; // Ensure this middleware is imported!

const router = express.Router();

// --- REGISTER ---
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();

    // Create token so they are logged in immediately after registering
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ 
      token, 
      username: user.username,
      message: "User registered" 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- LOGIN ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ 
      token, 
      username: user.username  
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- GET CURRENT USER (New: Required for About Page) ---
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// --- UPDATE USER BIO ---
router.put("/update-bio", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { bio: req.body.bio },
      { returnDocument: 'after', 
        runValidators: true }
    );
    res.json({ bio: user.bio });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;