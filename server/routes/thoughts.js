import express from "express";
import Thought from "../models/Thought.js";

const router = express.Router();

// GET all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ date: -1 });
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new thought
router.post("/", async (req, res) => {
  const { text, mood } = req.body;
  const thought = new Thought({ text, mood });
  try {
    const saved = await thought.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;