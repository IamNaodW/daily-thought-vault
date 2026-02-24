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

// UPDATE a thought
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, 
      { text: req.body.text },
      { returnDocument: 'after' } // Updated this line to remove the warning
    );
    if (!updatedThought) return res.status(404).json({ msg: "Thought not found" });
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a thought
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedThought = await Thought.findOneAndDelete({ 
      _id: req.params.id, 
      // Change userId to user
      user: req.user.id 
    });

    if (!deletedThought) return res.status(404).json({ msg: "Thought not found" });
    res.json({ message: "Thought deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;