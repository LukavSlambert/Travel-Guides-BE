const express = require("express");
const router = express.Router();
const reviewQuery = require("../../database/reviewQuery.js"); // Corrected import path
const handleServerError = require("../../libs/utility/ErrorHandlers.js");
const validate = require("../../libs/validation.js");

const getPlaceModelFromPlaceType = require("../../libs/utility/ModelPlace.js");

router.post("/", async (req, res) => {
  try {
    const { name, address, type } = req.body;
    const Model = getPlaceModelFromPlaceType(type);

    if (Model === null) {
      res.status(400).json({ error: `Invalid place type: ${type}` });
      return;
    }

    const existingPlace = await Model.findOne({
      name: name,
      address: address,
    });

    if (existingPlace) {
      const placeId = existingPlace._id;

      const reviews = await reviewQuery.getReviews(placeId);
      const averageRating = await reviewQuery.calculateAverageRating(placeId);

      res.status(200).json({
        message: "Place found in database.",
        placeId: placeId,
        reviews: reviews,
        averageRating: averageRating,
      });
    } else {
      res.status(404).json({ message: "Place not found in database." });
    }
  } catch (err) {
    handleServerError(err, res);
  }
});

router.delete("/:id", async (req, res) => {
  const reviewId = req.params.id;
  try {
    const review = await reviewQuery.deleteReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    handleServerError(err, res);
  }
});

//do post each review

module.exports = router;
