const express = require("express");
const router = express.Router();
const reviewQuery = require("../../database/reviewQuery.js"); // Corrected import path
const handleServerError = require("../../libs/utility/ErrorHandlers.js");
const validate = require("../../libs/validation.js");

router.post(
  "/",
  //  validate(reviewSchema),
  async (req, res) => {
    const newReview = req.body;
    try {
      const review = await reviewQuery.createReview(newReview);
      res.status(200).json(review);
    } catch (err) {
      handleServerError(err, res);
    }
  }
);

// router.get("/:id", async (req, res) => {
//   const placeId = req.params.id;
//   console.log(placeId);
//   try {
//     const reviews = await reviewQuery.getReviews(placeId);
//     console.log(reviews);
//     res.status(200).json(reviews);
//   } catch (err) {
//     handleServerError(err, res);
//   }
// });

router.get("/:cityCode/:placeName", async (req, res) => {
  const { cityCode, placeName } = req.params;
  console.log(cityCode, placeName);
  try {
    // Check if the place exists in the database
    const existingPlace = await Place.findOne({
      "cityInfo.cityCode": cityCode,
      cityName: placeName,
    });

    if (existingPlace) {
      // Place exists, return success message
      res
        .status(200)
        .json({ message: "Place found in database.", place: existingPlace });
    } else {
      // Place doesn't exist, return a message indicating so
      res.status(404).json({ message: "Place not found in database." });
    }
  } catch (err) {
    // Handle any errors
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

module.exports = router;
