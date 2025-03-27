const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  try {
    console.log("Register request received:", req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing!");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    console.log(user);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Login; User
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(`address is ${user.address}`);
    console.log("User trying to log in:", user);

    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ success: true, token, username: user.username, userId: user._id });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: error.message || "Server Error" });
  }
};