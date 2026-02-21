import mongoose from "mongoose";

const ThoughtSchema = new mongoose.Schema({
  text: { type: String, required: true },
  mood: { type: Number, default: 2 }, // 0-4
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Thought", ThoughtSchema);