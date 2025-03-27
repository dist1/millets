const express = require("express");
const {
  getMachineriesByLocation,
  postMachinery,
} = require("../controllers/machineryController");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", getMachineriesByLocation);
router.post("/", authenticateToken, postMachinery);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
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

module.exports = router;