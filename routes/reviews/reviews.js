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
