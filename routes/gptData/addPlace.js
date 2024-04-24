const express = require("express");
const router = express.Router();
const validate = require("../../libs/validation.js");
const handleServerError = require("../../libs/utility/ErrorHandlers.js");
const {
  Hotels,
  Restaurants,
  Attractions,
  getPlaceById,
  addPlaceToCollection,
} = require("../../database/placeQuery.js");
router.post("/", async (req, res) => {
  try {
    const place = req.body;
    const { type } = place;

    let Model;
    if (type === "hotel") Model = Hotels;
    else if (type === "restaurant") Model = Restaurants;
    else if (type === "attraction") Model = Attractions;

    const savedPlace = await addPlaceToCollection(place, Model);
    res.status(201).json(savedPlace);
  } catch (error) {
    console.log("Error in POST /add-place:", error);
    res.status(500).json({ error: "Internal server error" });
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
