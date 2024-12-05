const mongoose = require("mongoose");

const Report = new mongoose.Schema({
  reportedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending",
  },
});

module.exports = mongoose.model("Report", Report);
