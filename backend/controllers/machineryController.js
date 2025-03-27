const Machinery = require("../models/Machinery");

exports.getMachineriesByLocation = async (req, res) => {
  try {
    const { state, district } = req.query; 

    const machineries = await Machinery.find({
      "location.state": state,
      "location.district": district,
    });

    res.status(200).json(machineries);
  } catch (error) {
    console.error("Error fetching machineries:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.postMachinery = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      type,
      availability,
      rentalPrice,
      state,
      district,
    } = req.body;
    const owner = req.user.userId;

    const newMachinery = new Machinery({
      name,
      image,
      description,
      type,
      availability,
      rentalPrice,
      location: { state, district },
      owner,
    });

    await newMachinery.save();
    res.status(201).json({ message: "Machinery posted successfully" });
  } catch (error) {
    console.error("Error posting machinery:", error);
    res.status(500).json({ message: "Server error" });
  }
};