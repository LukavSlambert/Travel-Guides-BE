const express = require("express");
const router = express.Router();
const attractionQuerys = require("../../database/attractionQuerys.js");

router.post("/", async (req, res) => {
  const NewAttraction = req.body;
  try {
    const attraction = await attractionQuerys.CreateAttraction(NewAttraction);
    res.json(attraction);
  } catch (err) {
    handleServerError(err, res);
  }
});

module.exports = router;
