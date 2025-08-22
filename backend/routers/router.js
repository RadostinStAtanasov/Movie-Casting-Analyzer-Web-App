const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/movies", (req, res) => {
  const fileContent = fs.readFileSync("./data/movies.csv", "utf-8");

  let objCSVArr = papaNotParser(fileContent);

  //   const moviesData = Papa.parse(fileContent, {
  //     header: true,
  //     dynamicTyping: true,
  //   });

  res.status(200).json(objCSVArr);
});

router.get("/actors", (req, res) => {
  const fileContent = fs.readFileSync("./data/actors.csv", "utf8");

  let objCSVArr = papaNotParser(fileContent);

  //   const actorsData = Papa.parse(fileContent, {
  //     header: true,
  //     dynamicTyping: true,
  //   });

  res.status(200).json(objCSVArr);
});

router.get("/roles", (req, res) => {
  const fileContent = fs.readFileSync("./data/roles.csv", "utf-8");

  let objCSVArr = papaNotParserRoles(fileContent);

  res.status(200).json(objCSVArr);
});

function papaNotParser(fileContent) {
  let arrCsv = fileContent.split("\r\n");
  let firstLineTitles = arrCsv[0].split(",");
  let firstTitle = firstLineTitles[0];
  let secondTitle = firstLineTitles[1];
  let thirdTitle = firstLineTitles[2];
  let objCSV = {};
  let objCSVArr = [];

  for (let i = 1; i < arrCsv.length; i++) {
    let row = arrCsv[i].split(",");

    objCSV[firstTitle] = row[0];
    objCSV[secondTitle] = row[1];
    objCSV[thirdTitle] = row[2];

    objCSVArr.push(objCSV);
    objCSV = {};
  }

  return objCSVArr;
}

function papaNotParserRoles(fileContent) {
  let arrCsv = fileContent.split("\r\n");
  let firstLineTitles = arrCsv[0].split(",");
  let firstTitle = firstLineTitles[0];
  let secondTitle = firstLineTitles[1];
  let thirdTitle = firstLineTitles[2];
  let forthTitle = firstLineTitles[3];
  let objCSV = {};
  let objCSVArr = [];

  for (let i = 1; i < arrCsv.length; i++) {
    let row = arrCsv[i].split(",");

    objCSV[firstTitle] = row[0];
    objCSV[secondTitle] = row[1];
    objCSV[thirdTitle] = row[2];
    objCSV[forthTitle] = row[3];

    objCSVArr.push(objCSV);
    objCSV = {};
  }

  return objCSVArr;
}

module.exports = router;
