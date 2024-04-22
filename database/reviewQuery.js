const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  author: {
    type: String,
    required: true,
  },
  text: String,
});

const Review = mongoose.model("Review", reviewSchema);

async function createReview(review) {
  try {
    const existingReview = await Review.findOne({
      userId: review.userId,
      placeId: review.placeId,
    });

    if (existingReview) {
      existingReview.rating = review.rating;
      existingReview.text = review.text;
      existingReview.date = Date.now();
      await existingReview.save();
      return existingReview;
    } else {
      const newReview = await Review.create(review);
      return newReview;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteReviewById(reviewId) {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    return deletedReview;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  Review,
  createReview,
  deleteReviewById,
};
