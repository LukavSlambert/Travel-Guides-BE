const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  cityInfo: [
    {
      cityCode: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      lat: {
        type: Number, // Changed to Number
        required: true,
      },
      lng: {
        type: Number, // Changed to Number
        required: true,
      },
    },
  ],
  type: {
    type: String,
    required: true,
  },
});

const Hotels = mongoose.model("hotels", placeSchema);
const Restaurants = mongoose.model("restaurants", placeSchema);
const Attractions = mongoose.model("attractions", placeSchema);

async function addPlaceToCollection(place, model) {
  try {
    const { cityName } = model;
    const existingPlace = await model.findOne({ cityName });

    if (existingPlace) {
      return existingPlace;
    } else {
      const newPlace = new model(place);
      const savedPlace = await newPlace.save();
      return savedPlace;
    }
  } catch (error) {
    console.log("Error in addPlaceToCollection:", error);
    throw error;
  }
}

async function getPlaceById(userId) {
  try {
    const existingPlace = await Place.findOne({ userId });

    if (existingPlace) {
      return existingPlace;
    } else {
      throw new Error("Place not found");
    }
  } catch (error) {
    console.log("Error in getPlaceById:", error);
    throw error;
  }
}

module.exports = {
  Hotels,
  Restaurants,
  Attractions,
  getPlaceById,
  addPlaceToCollection,
};
