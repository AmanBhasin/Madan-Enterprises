const mongoose = require("mongoose");

const kalamSchema = new mongoose.Schema({
  Quantity: Number,
  Rate: Number,
  Product: String,
  Bill: Number,
  Paid: Number,
  Name: String,
  date: {
    type: String, // store as YYYY-MM-DD string
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Kalam", kalamSchema);
