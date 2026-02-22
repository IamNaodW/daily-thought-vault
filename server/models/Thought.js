import mongoose from "mongoose";

const thoughtSchema = new mongoose.Schema({
  text: String,
  mood: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Thought", thoughtSchema);