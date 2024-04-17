const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for attraction, restaurant, and hotel
const attractionSchema = new Schema({
  name: String,
  location: String,
  description: String,
});

// Since all three have the same schema, we can reuse it for restaurant and hotel
const restaurantSchema = attractionSchema;
const hotelSchema = attractionSchema;

// Define the trip schema with nested subdocuments
const tripSchema = new Schema({
  attractions: [attractionSchema], // Array of subdocuments for attractions
  restaurants: [restaurantSchema], // Array of subdocuments for restaurants
  hotels: [hotelSchema], // Array of subdocuments for hotels
});

// Compile the schema into a model
const Trip = mongoose.model("Trip", tripSchema);

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
