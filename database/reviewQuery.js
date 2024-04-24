const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const reviewSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  placeId: {
    type: ObjectId,
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

// Function to calculate the average rating for a given placeId
async function calculateAverageRating(placeId) {
  try {
    const pipeline = [
      {
        $match: {
          placeId: mongoose.Types.ObjectId(placeId),
          rating: { $ne: null }, // Filter out documents with null rating
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ];

    const result = await Review.aggregate(pipeline);

    if (result.length > 0) {
      return result[0].averageRating;
    } else {
      return 0; // If there are no reviews for the given placeId, return 0
    }
  } catch (error) {
    console.error("Error calculating average rating:", error);
    throw error;
  }
}

// Example usage
const placeId = "YourPlaceIdHere"; // Replace 'YourPlaceIdHere' with the actual placeId
calculateAverageRating(placeId)
  .then((averageRating) => {
    console.log("Average Rating:", averageRating);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

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

async function getReviews(placeId) {
  try {
    const reviews = await Review.find({ placeId });
    return reviews;
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
  getReviews,
};
