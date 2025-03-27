require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv"); 
const OpenAI = require("openai");
const { chatbotResponse } = require("./controllers/chatbotController");

const app = express();  
dotenv.config();  
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
// Default Route (Health Check)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
}); 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// ---------------------------

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chatbot", chatbotResponse);