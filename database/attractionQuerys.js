const mongoose = require("mongoose");
// const Attraction = require("./models/attraction.js");
const Schema = mongoose.Schema;

// const newAtt = new Attraction({
//   date: new Date(),
//   duration: "1d",
//   content: "New attraction omg omg omg",
//   contributors: [mongoose.Types.ObjectId("6619296ef98630fdb6656968")],
//   tags: null,
//   location: null,
//   author: mongoose.Types.ObjectId("6619296ef98630fdb6656968"),
//   rating: 5.0,
// });

const NewAttraction = new Schema({
  date: Date,
  duration: String,
  content: String,
  contributors: [{ type: "ObjectId", ref: "User" }],
  tags: String,
  location: String,
  author: { type: "ObjectId", ref: "User" },
  rating: Number,
});

const Attraction = mongoose.model("Attraction", NewAttraction);

async function CreateAttraction(newAtt) {
  try {
    await Attraction.create();
    return;
  } catch (err) {
    console.error(err);
  }
}

// CreateAttraction(newAtt);

module.exports = { CreateAttraction };
