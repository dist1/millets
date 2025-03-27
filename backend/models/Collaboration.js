const mongoose = require("mongoose");

const CollaborationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["Farming Practices", "Pest Control", "Sustainability", "Joint Farming"], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: {
    state: { type: String, required: true },
    district: { type: String, required: true }
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Collaboration", CollaborationSchema);