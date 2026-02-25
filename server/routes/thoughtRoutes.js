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

router.get("/streak", auth, async (req, res) => {
  try {
    const thoughts = await Thought.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    if (thoughts.length === 0) return res.json({ streak: 0 });

    const dates = [...new Set(thoughts.map(t => 
      new Date(t.createdAt).toISOString().split('T')[0]
    ))];

    let streak = 0;
    let curr = new Date();
    
    // Check today
    const today = curr.toISOString().split('T')[0];
    curr.setDate(curr.getDate() - 1);
    const yesterday = curr.toISOString().split('T')[0];

    // If no post today AND no post yesterday, streak is 0
    if (dates[0] !== today && dates[0] !== yesterday) {
      return res.json({ streak: 0 });
    }

    // Start checking from the most recent active day
    let checkDate = new Date(dates[0]);
    
    for (let i = 0; i < dates.length; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (dates.includes(dateStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({ streak });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;