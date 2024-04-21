const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const tripSchema = new Schema({
  cityName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topRestaurants: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      budget: {
        type: String,
        enum: ["$", "$$", "$$$"], // Restrict budget to these values
        required: true,
      },
    },
  ],
  topAttractions: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      budget: {
        type: String,
        enum: ["$", "$$", "$$$"], // Restrict budget to these values
        required: true,
      },
    },
  ],
  topHotels: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      budget: {
        type: String,
        enum: ["$", "$$", "$$$"], // Restrict budget to these values
        required: true,
      },
    },
  ],
});

// Create model
const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;

// Compile the schema into a model

const createTrip = async function (newTrip) {
  try {
    const trip = new Trip(newTrip);
    await trip.save();
    return trip;
  } catch (err) {
    console.error(err);
  }
};

const findTrips = async function () {
  try {
    const trips = await Trip.find();
    return trips;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteTripById = async function (tripId) {
  try {
    const result = await Trip.deleteOne({ _id: tripId });
    return result;
  } catch (err) {
    console.error(err);
  }
};

const updateTrip = async function (tripId, updatedValues) {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: tripId },
      { $set: updatedValues },
      { new: true }
    );
    return updatedTrip;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  Trip,
  createTrip,
  updateTrip,
  deleteTripById,
  findTrips,
};
