const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const methodOverride = require("method-override");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");

function validateReview(req, res, next) {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((e) => e.message);
    throw new ExpressError(400, error);
  } else {
    next();
  }
}

//review post route
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    console.log();
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
  })
);

//delete review route
router.delete("/:reviewId", async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
});

module.exports = router;
