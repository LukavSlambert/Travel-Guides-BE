require("dotenv").config();
const mongodb = require("./database/mongodb.js");

const express = require("express");
const app = express();

app.use(require("cors")());
app.use(express.json());

app.use("/signup", require("./routes/users/signup.js"));
app.use("/login", require("./routes/users/login.js"));
app.use("/profile", require("./routes/users/profile.js"));
app.use("/users", require("./routes/users/user.js"))
app.use("/gpt", require("./routes/aiAPIs/apis.js"))
app.use("/addAttraction", require("./routes/attractions/add.js"));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

const hostname = "0.0.0.0";
const port = 3001;

app.listen(port, hostname, () => {
  mongodb.connect();
  console.log(`Server running at http://${hostname}:${port}/`);
});
