require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const machineryRoutes = require("./routes/machineryRoutes");
const collaborationRoutes = require("./routes/collaborationRoutes");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { chatbotResponse } = require("./controllers/chatbotController");
const OpenAI = require("openai");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Connect to Database
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/machineries", machineryRoutes);
app.use("/api/collaborations", collaborationRoutes);

// Protected Route to get User State & District
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ state: user.state, district: user.district });
  } catch (error) {
    console.error("Error in /api/user:", error);
    res.status(500).json({ message: error.message });
  }
});

// Chatbot Route
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.post("/api/chatbot", chatbotResponse);

// Default Route (Health Check)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
