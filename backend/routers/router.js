const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/movies", (req, res) => {
  const fileContent = fs.readFileSync("./data/movies.csv", "utf-8");

  let objCSVArr = papaNotParser(fileContent);

  res.status(200).json(objCSVArr);
});

router.post("/movies", (req, res) => {
  const data = req.body;
  const fileContent = fs.readFileSync("./data/movies.csv", "utf8");
  let objCSVArr = papaNotParser(fileContent);

  objCSVArr.unshift({ ...data });
  fs.writeFileSync("./data/movies.csv", papaNotUnParserDateChange(objCSVArr));
});

router.delete("/movies/:movieId", (req, res) => {
  const id = req.params.movieId;
  const fileContent = fs.readFileSync("./data/movies.csv", "utf8");

  let objCSVArr = papaNotParser(fileContent);
  let resultArrWithouthMovie = objCSVArr.filter((m) => m.ID !== id);

  fs.writeFileSync(
    "./data/movies.csv",
    papaNotUnParser(resultArrWithouthMovie)
  );
});

router.put("/movies/update/updatetitleAndReleasedate/:movieId", (req, res) => {
  const id = req.params.movieId;
  const data = req.body;

  const fileContent = fs.readFileSync("./data/movies.csv", "utf8");
  const objCSVArr = papaNotParser(fileContent);

  for (let i = 0; i < objCSVArr.length; i++) {
    if (objCSVArr[i].ID == id) {
      objCSVArr[i].Title = data.newTitle;
      objCSVArr[i].ReleaseDate = data.newDate;
    }
  }

  fs.writeFileSync("./data/movies.csv", papaNotUnParserDateChange(objCSVArr));
});

router.put("/movies/update/:movieId", (req, res) => {
  const data = req.body;
  const actorId = req.params.movieId;

  const fileContent = fs.readFileSync("./data/roles.csv", "utf8");
  const objCSVArr = papaNotParserRoles(fileContent);

  for (let i = 0; i < objCSVArr.length; i++) {
    if (
      objCSVArr[i].ActorID === actorId &&
      objCSVArr[i].MovieID === data.movieId
    ) {
      objCSVArr[i].RoleName = data.newRoleName;
    }
  }

  fs.writeFileSync("./data/roles.csv", papaNotUnParser(objCSVArr));
});

router.get("/roles", (req, res) => {
  const fileContent = fs.readFileSync("./data/roles.csv", "utf-8");

  let objCSVArr = papaNotParserRoles(fileContent);

  res.status(200).json(objCSVArr);
});

router.get("/actors", (req, res) => {
  const fileContent = fs.readFileSync("./data/actors.csv", "utf8");

  let objCSVArr = papaNotParser(fileContent);

  res.status(200).json(objCSVArr);
});

router.post("/actors", (req, res) => {
  const data = req.body;
  const fileContent = fs.readFileSync("./data/actors.csv", "utf8");
  let objCSVArr = papaNotParser(fileContent);
  objCSVArr.unshift({ ...data });
  fs.writeFileSync("./data/actors.csv", papaNotUnParserDateChange(objCSVArr));
});

router.delete("/actors/:actorId", (req, res) => {
  const id = req.params.actorId;
  const fileContent = fs.readFileSync("./data/actors.csv", "utf8");

  let objCSVArr = papaNotParser(fileContent);
  let resultArrWithoutActor = objCSVArr.filter((a) => a.ID !== id);

  fs.writeFileSync("./data/actors.csv", papaNotUnParser(resultArrWithoutActor));
});

router.put("/actors/updateName/:actorId", (req, res) => {
  const id = req.params.actorId;
  const data = req.body;
  const newName = data.actorName;
  const fileContent = fs.readFileSync("./data/actors.csv", "utf8");

  let objCSVArr = papaNotParser(fileContent);

  for (let i = 0; i < objCSVArr.length; i++) {
    if (objCSVArr[i].ID === id) {
      objCSVArr[i].FullName = newName;
    }
  }

  fs.writeFileSync("./data/actors.csv", papaNotUnParser(objCSVArr));
});

router.put("/actors/update/:actorId", (req, res) => {
  const idMovie = req.params.actorId;
  const newMovieName = req.body.movieTitle;
  const newRole = req.body.actorRole;
  const actorId = req.body.idActor;

  const fileContentMovies = fs.readFileSync("./data/movies.csv", "utf8");

  let objCSVArrMovies = papaNotParser(fileContentMovies);

  for (let i = 0; i < objCSVArrMovies.length; i++) {
    if (objCSVArrMovies[i].ID === idMovie) {
      objCSVArrMovies[i].Title = newMovieName;
    }
  }

  fs.writeFileSync("./data/movies.csv", papaNotUnParser(objCSVArrMovies));

  const fileContentRoles = fs.readFileSync("./data/roles.csv", "utf8");
  let objCSVArrRoles = papaNotParserRoles(fileContentRoles);

  for (let i = 0; i < objCSVArrRoles.length; i++) {
    if (
      objCSVArrRoles[i].ActorID === actorId &&
      objCSVArrRoles[i].MovieID === idMovie
    ) {
      objCSVArrRoles[i].RoleName = newRole;
    }
  }

  fs.writeFileSync("./data/roles.csv", papaNotUnParser(objCSVArrRoles));
});

function papaNotUnParser(fileContent) {
  let firstLineKeys = Object.keys(fileContent[0]);

  let lineCSVFile = firstLineKeys.join(",") + "\r\n";

  for (let i = 0; i < fileContent.length; i++) {
    let lineValues = Object.values(fileContent[i]);
    if (i == fileContent.length - 1) {
      lineCSVFile += lineValues.join(",");
    } else {
      lineCSVFile += lineValues.join(",") + "\r\n";
    }
  }

  console.log("tuka sme");
  return lineCSVFile;
}

function papaNotUnParserDateChange(fileContent) {
  let firstLineKeys = Object.keys(fileContent[0]);

  let lineCSVFile = firstLineKeys.join(",") + "\r\n";

  for (let i = 0; i < fileContent.length; i++) {
    let lineValues = Object.values(fileContent[i]);
    if (i == fileContent.length - 1) {
      lineCSVFile += lineValues.join(",");
    } else {
      lineCSVFile += lineValues[0] + ",";
      lineCSVFile += lineValues[1] + ",";
      let splitLine = lineValues[2].split("T");
      if (firstLineKeys[1] === "Title") {
        lineCSVFile += splitLine[0].split("-").join("/") + "\r\n";
      } else {
        lineCSVFile += splitLine[0] + "\r\n";
      }
    }
  }

  console.log("tuka sme");
  console.log(firstLineKeys[1]);
  return lineCSVFile;
}

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
