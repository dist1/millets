const mongoose = require("mongoose");

const MachinerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  type: { type: String, required: true },
  availability: { type: String, required: true },
  rentalPrice: { type: Number, required: true },
  location: {
    state: { type: String, required: true },
    district: { type: String, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Machinery", MachinerySchema);