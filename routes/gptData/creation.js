const express = require("express");
const router = express.Router();
const validate = require("../../libs/validation");
const handleServerError = require("../../libs/utility/ErrorHandlers.js");
const {
  addToCollection,
  Hotel,
  Restaurant,
  Attraction,
} = require("../../database/gptQuerys.js");

const chatGptData = {
  hotels: [{ place: "1" }, { place: "2" }],
  attractions: [{ place: "1" }, { place: "2" }],
  resturants: [{ place: "1" }, { place: "2" }],
};
//todo- how to convert keys from front to the schema
//todo- how to convert keys from model that not excist already- for example rating.

router.post("/", async (req, res) => {
  const { hotels, attractions, restaurants } = req.body;

  try {
    const addedHotels = await addToCollection(hotels, Hotel);
    const addedRestaurants = await addToCollection(restaurants, Restaurant);
    const addedAttractions = await addToCollection(attractions, Attraction);

    res.status(200).json({
      hotels: addedHotels,
      restaurants: addedRestaurants,
      attractions: addedAttractions,
    });
  } catch (err) {
    handleServerError(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  const attractionId = req.params.id;
  try {
    const attraction = await attractionQuerys.deleteAttractionById(
      attractionId
    );
    if (!attraction) {
      return res.status(404).json({ message: "Attraction not found" });
    }
    res.status(200).json(attraction);
  } catch (err) {
    handleServerError(err, res);
  }
});

router.put(
  "/:id",
  // validate(attractionsSchemas), // Use schema for updating an attraction
  async (req, res) => {
    const attractionId = req.params.id;
    const updatedAttraction = req.body;
    try {
      const attraction = await attractionQuerys.updateAttraction(
        model,
        attractionId,
        updatedAttraction
      );
      if (!attraction) {
        return res.status(404).json({ message: "Attraction not found" });
      }
      res.status(200).json(attraction);
    } catch (err) {
      handleServerError(err, res);
    }
  }
);

module.exports = router;
