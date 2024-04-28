const express = require("express");
const router = express.Router();
const validate = require("../../libs/validation.js");
const { addPlaceToCollection } = require("../../database/placeQuery.js");
const getPlaceModelFromPlaceType = require("../../libs/utility/ModelPlace.js");

router.post("/", async (req, res) => {
  try {
    const place = req.body;
    const { type } = place;

    const Model = getPlaceModelFromPlaceType(type);

    if (Model === null) {
      res.status(400).json({ error: `Invalid place type: ${type}` });
      return;
    }

    const savedPlace = await addPlaceToCollection(place, Model);
    console.log(savedPlace);
    res.status(201).json(savedPlace);
  } catch (error) {
    console.log("Error in POST /add-place:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
