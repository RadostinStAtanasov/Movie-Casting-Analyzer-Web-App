const express = require("express");
const fs = require("fs");
const router = express.Router();
const Papa = require("papaparse");

router.get("/movies", (req, res) => {
  const fileContent = fs.readFileSync("./data/movies.csv", "utf-8");
  const moviesData = Papa.parse(fileContent, {
    header: true,
    dynamicTyping: true,
  });

  res.status(200).json({ movies: moviesData.data });
});

router.get("/places", (req, res) => {
  const fileContent = fs.readFileSync("./data/places.json");
  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

module.exports = router;
