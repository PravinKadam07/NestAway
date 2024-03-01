const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/an-underwater-view-of-a-colorful-coral-reef-HYHYGLs-Rp8"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

ListingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany(listing.reviews._id, { $in: listing.reviews });
  }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
