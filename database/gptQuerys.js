async function addToCollection(arrayOfObjects, Model) {
  //todo- update with upsert= true
  //todo-update with bulk
  try {
    const results = [];
    for (let i = 0; i < arrayOfObjects.length; i++) {
      const namePlace = arrayOfObjects[i].namePlace;
      const existingPlace = await Model.findOne({ namePlace });

      if (existingPlace) results.push(existingPlace);
      else {
        const newPlace = new Model(arrayOfObjects[i]);
        newPlace.comments = [];
        const savePlace = await newPlace.save();
        results.push(savePlace);
      }
    }
    return results;
  } catch (error) {
    console.log("error in addToCollection", error);
    throw err;
  }
}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  namePlace: String, // Assuming you want to store the place name
  // Add other fields specific to restaurants if needed
  // For example:
  // rating: Number,
  // cuisine: String,
  // address: String,
});

const hotelSchema = new Schema({
  namePlace: String, // Assuming you want to store the place name
  // Add other fields specific to hotels if needed
  // For example:
  // rating: Number,
  // address: String,
  // amenities: [String],
});

const attractionSchema = new Schema({
  namePlace: String, // Assuming you want to store the place name
  // Add other fields specific to activities if needed
  // For example:
  // type: String,
  // duration: Number,
  // description: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
const Hotel = mongoose.model("Hotel", hotelSchema);
const Attraction = mongoose.model("Attraction", attractionSchema);

module.exports = { Restaurant, Hotel, Attraction, addToCollection };
