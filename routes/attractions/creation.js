const express = require("express");
const router = express.Router();
const attractionQuerys = require("../../database/attractionQuerys.js");
const handleServerError = require("../../libs/utility/ErrorHandlers.js");

router.post("/", async (req, res) => {
  const NewAttraction = req.body;
  try {
    const attraction = await attractionQuerys.createAttraction(NewAttraction);
    res.status(200).json(attraction);
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

// Update an attraction
router.put("/:id", async (req, res) => {
  const attractionId = req.params.id;
  const updatedAttraction = req.body;
  try {
    const attraction = await attractionQuerys.updateAttraction(
      attractionId,
      updatedAttraction,
      { new: true }
    );
    if (!attraction) {
      return res.status(404).json({ message: "Attraction not found" });
    }
    res.status(200).json(attraction);
  } catch (err) {
    handleServerError(err, res);
  }
});

module.exports = router;
