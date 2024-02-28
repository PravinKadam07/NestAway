const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const MONGO_URL = "mongodb://127.0.0.1:27017/nestAway";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hii i am root");
});

app.get("/listings", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// app.get("/testListing", async (req, res) => {
//   let sample = new Listing({
//     title: "My Villa",
//     description: "in front of sea",
//     price: 1200,
//     country: "india",
//   });
//   await sample.save();
//   console.log("Add to DB");
//   res.send("sucessfull");
// });
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
