import express from "express";
import Quote from "../models/Quote.js";
const router = express.Router();

// Get one random quote
router.get("/random", async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    if (count === 0) return res.status(404).json({ message: "No quotes in vault" });
    
    const randomQuote = await Quote.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomQuote[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;