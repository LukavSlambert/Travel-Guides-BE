require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.use(require("cors")());
app.use(express.json());

app.use("/signup", require("./routes/users/signup.js"));
app.use("/login", require("./routes/users/login.js"));

const hostname = "0.0.0.0";
const port = 3001;

// const mongodb = require("./database/mongodb.js");
// const Attraction = require("./models/attraction.js");
// const newAtt = new Attraction({
//   date: new Date(),
//   duration: "1d",
//   content: "New attraction omg omg omg",
//   contributors: [new mongoose.Types.ObjectId("6619296ef98630fdb6656968")],
//   tags: null,
//   location: null,
//   author: new mongoose.Types.ObjectId("6619296ef98630fdb6656968"),
//   rating: 5.0,
// });

// newAtt.save();

app.listen(port, hostname, () => {
  mongodb.connect();
  console.log(`Server running at http://${hostname}:${port}/`);
});
