const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");
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

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
