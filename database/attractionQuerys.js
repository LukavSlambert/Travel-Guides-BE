const mongoose = require("mongoose");
// Define the common schema for all events
const attractionSchema = new mongoose.Schema({
  country: { type: String, required: true },
  city: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  bookingLink: {
    type: String,
    validate: {
      validator: function (v) {
        // Simple URL validation regex
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  description: {
    type: String,
    maxlength: 400,
  },
  priceRange: {
    type: String,
    enum: ["cheap", "average", "expensive"],
  },
});

const createAttraction = async function (newAtt) {
  try {
    const attraction = new Attraction(newAtt);
    await attraction.save();
    return attraction;
  } catch (err) {
    console.error(err);
  }
};

const findAttractions = async function () {
  try {
    const attractions = await Attraction.find();
    return attractions;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteAttractionById = async function (attractionId) {
  try {
    const result = await Attraction.deleteOne({ _id: attractionId });
    return result;
  } catch (err) {
    console.error(err);
  }
};

const updateAttraction = async function (attractionId, updatedValues) {
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
};

// Create the base model
const Attraction = mongoose.model("Attraction", attractionSchema);

// Now you can use these methods with each event type model
module.exports = {
  Attraction,
  updateAttraction,
  deleteAttractionById,
  findAttractions,
  createAttraction,
};
