import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import thoughtsRoutes from "./routes/thoughtRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import quoteRoutes from "./routes/quoteRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/thoughts", thoughtsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quotes", quoteRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));