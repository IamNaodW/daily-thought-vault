import express from "express";
import Thought from "../models/Thought.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE THOUGHT
router.post("/", auth, async (req, res) => {
  try {
    const thought = await Thought.create({
      text: req.body.text,
      mood: req.body.mood,
      user: req.user.id
    });

    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: "Failed to create thought" });
  }
});

// GET USER THOUGHTS
router.get("/", auth, async (req, res) => {
  try {
    const thoughts = await Thought
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch thoughts" });
  }
});

export default router;