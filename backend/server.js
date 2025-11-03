import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import adminDashboardRoutes from "./routes/adminDashboard.js";
import menuRoutes from "./routes/menuRoutes.js";

dotenv.config();

// ✅ Connect to MongoDB
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
connectMongo();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/menus", menuRoutes);

app.get("/", (req, res) => {
  res.send("🍽️ FoodyFly Backend API is running...");
});

// ✅ Port handling with retry if busy
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    const newPort = Number(PORT) + 1;
    console.warn(`⚠️ Port ${PORT} in use. Trying port ${newPort}...`);
    app.listen(newPort, () =>
      console.log(`✅ Server running on port ${newPort}`)
    );
  } else {
    console.error("❌ Server error:", err);
  }
});
