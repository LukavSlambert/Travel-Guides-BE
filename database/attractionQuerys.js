const mongoose = require("mongoose");
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

const attractionSchema = new Schema({
  date: Date,
  duration: String,
  title: String,
  content: String,
  contributors: [{ type: "ObjectId", ref: "User" }],
  tags: [String],
  location: String,
  author: { type: "ObjectId", ref: "User" },
  rating: Number,
});

const Attraction = mongoose.model("Attraction", attractionSchema);

async function findAttractions() {
  try {
    const attractions = await Attraction.find();
    return attractions;
  } catch (err) {
    console.error(err);
    return null;
  }
}
async function createAttraction(newAtt) {
  try {
    const attraction = new Attraction(newAtt);
    await attraction.save();
    return attraction;
  } catch (err) {
    console.error(err);
  }
}

async function deleteAttractionById(attractionId) {
  try {
    const result = await Attraction.deleteOne({ _id: attractionId });
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function updateAttraction(attractionId, updatedValues) {
  try {
    const updatedAttraction = await Attraction.findOneAndUpdate(
      { _id: attractionId },
      { $set: updatedValues },
      { new: true }
    );
    return updatedAttraction;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createAttraction,
  deleteAttractionById,
  updateAttraction,
  findAttractions,
};
