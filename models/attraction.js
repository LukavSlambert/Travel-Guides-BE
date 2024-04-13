const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema({
  date: Date,
  duration: String,
  content: String,
  contributors: [{ type: "ObjectId", ref: "User" }],
  tags: String,
  location: String,
  author: { type: "ObjectId", ref: "User" },
  rating: Number,
});

const Attraction = mongoose.model("Attraction", attractionSchema);

module.exports = Attraction;
