const express = require("express");
const router = express.Router();
const attractionQuerys = require("../../database/attractionQuerys.js");
const handleServerError = require("../../libs/utility/ErrorHandlers.js");
const attractionsSchemas = require("../../libs/schemas/attractions.js");
const validate = require("../../libs/validation");

router.post(
  "/",
  validate(attractionsSchemas.newAttractionSchema), // Use schema for creating a new attraction
  async (req, res) => {
    const newAttraction = req.body; // Corrected variable name
    try {
      const attraction = await attractionQuerys.createAttraction(
        model,
        newAttraction // Corrected variable name
      );
      res.status(200).json(attraction);
    } catch (err) {
      handleServerError(err, res);
    }
  }
);

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
  validate(attractionsSchemas.newAttractionSchema), // Use schema for updating an attraction
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
