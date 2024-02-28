const express = require("express");
const app = express();
const monogoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/nestAway";

async function main() {
  await monogoose.connect(MONGO_URL);
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
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
