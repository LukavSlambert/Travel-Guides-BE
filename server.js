require("dotenv").config();
const mongodb = require("./database/mongodb.js");

const express = require("express");
const app = express();

app.use(require("cors")());
app.use(express.json());

app.use("/signup", require("./routes/users/signup.js"));
app.use("/login", require("./routes/users/login.js"));
app.use("/gptData", require("./routes/gptData/addPlace.js"));
app.use("/review", require("./routes/reviews/reviews.js"));

const hostname = "0.0.0.0";
const port = 3001;

app.listen(port, hostname, () => {
  mongodb.connect();
  console.log(`Server running at http://${hostname}:${port}/`);
});
