import { useState, useEffect } from "react";
import classes from "./Home.module.css";

export default function HomePage() {
  const [rows, setRows] = useState([]);
  const [actors, setActors] = useState([]);
  const [listMoviesTitles, setListMoviesTitles] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("./roles.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      let arrCsv = csv.split("\r\n");
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
      //console.log(objCSVArr);

      setRows(objCSVArr);
    }
    getData();
  }, []);

  function topActorPair(rows) {
    let firstActorCheck;
    let secondActorCheck;
    let countPairActorsTogether = 0;
    let maxCountPairActorsTogether = 0;
    let firstActorId = firstActorCheck;
    let secondActorId = secondActorCheck;
    let moviesPlayedTogether = [];
    let checkIsEqualToFirst;
    let checkIsEqualToSecond;
    let result = {};

    for (let i = 0; i < rows.length; i++) {
      firstActorCheck = +rows[i].ActorID; // first Actor id
      let firstActorMovieID = +rows[i].MovieID;

      if (moviesPlayedTogether.length == 1) {
        moviesPlayedTogether = [];
        firstActorId = null;
        secondActorId = null;
        maxCountPairActorsTogether = 0;
      }

      for (let j = i + 1; j < rows.length; j++) {
        secondActorCheck = +rows[j].ActorID; // second actor id
        let secondActorMovieID = +rows[j].MovieID;

        if (firstActorMovieID !== secondActorMovieID) {
          break;
        }

        countPairActorsTogether = 0;
        for (let l = 0; l < rows.length - 1; l++) {
          checkIsEqualToFirst = +rows[l].ActorID;
          checkIsEqualToSecond = +rows[l + 1].ActorID;
          if (
            firstActorCheck == checkIsEqualToFirst &&
            secondActorCheck == checkIsEqualToSecond &&
            rows[l].MovieID == rows[l + 1].MovieID
          ) {
            countPairActorsTogether++;
            if (countPairActorsTogether > maxCountPairActorsTogether) {
              maxCountPairActorsTogether = countPairActorsTogether;
              firstActorId = +rows[l].ActorID;
              secondActorId = +rows[l + 1].ActorID;
              moviesPlayedTogether.push(+rows[l].MovieID);
            }
          } else if (
            secondActorCheck == checkIsEqualToFirst &&
            firstActorCheck == checkIsEqualToSecond &&
            rows[l].MovieID == rows[l + 1].MovieID
          ) {
            countPairActorsTogether++;
            if (countPairActorsTogether > maxCountPairActorsTogether) {
              maxCountPairActorsTogether = countPairActorsTogether;
              firstActorId = +rows[l].ActorID;
              secondActorId = +rows[l + 1].ActorID;
              moviesPlayedTogether.push(+rows[l].MovieID);
            }
          }
        }
      }
    }
    result.firstActor = firstActorId;
    result.secondActor = secondActorId;
    result.moviesPlayedTogether1 = moviesPlayedTogether;
    result.maxCountPairActorsTogether1 = maxCountPairActorsTogether;
    return result;
  }
  const resRows = topActorPair(rows);

  useEffect(() => {
    async function getData() {
      const response = await fetch("./actors.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text

      let arrCsv = csv.split("\r\n");
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
      //console.log(objCSVArr);

      setActors(objCSVArr);
    }
    getData();
  }, []);

  function getTopactorsNames(resRows, actors) {
    let topActors = [];

    for (let i = 0; i < actors.length; i++) {
      if (actors[i].ID == resRows.firstActor) {
        topActors.push(actors[i].FullName);
      } else if (+actors[i].ID == resRows.secondActor) {
        topActors.push(actors[[i]].FullName);
      }
    }
    return topActors;
  }
  const resultTopActors = getTopactorsNames(resRows, actors);

  useEffect(() => {
    async function getData() {
      const response = await fetch("./movies.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text

      let arrCsv = csv.split("\r\n");
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
      //console.log(objCSVArr);
      setListMoviesTitles(objCSVArr);
    }
    getData();
  }, []);

  function listOfMovieTitles(listMoviesTitles, resRows) {
    let listMovie = [];

    for (let i = 0; i < listMoviesTitles.length; i++) {
      for (let j = 0; j < resRows.moviesPlayedTogether1.length; j++) {
        let movieCheck = resRows.moviesPlayedTogether1[j];
        if (listMoviesTitles[i].ID == movieCheck) {
          listMovie.push(listMoviesTitles[i].Title);
        }
      }
    }
    //console.log(listMovie);
    return listMovie;
  }

  let resultMovieList = listOfMovieTitles(listMoviesTitles, resRows);

  return (
    <>
      <h1 className={classes.title}>Movie Casting Analyze Web </h1>

      <div className={classes.container}>
        {resultMovieList.length != 0 ? (
          <div>
            <div className={classes.topActorPairContainer}>
              <div>Top Actor Pair</div>
              <li>
                <strong>Actor 1:</strong> {resultTopActors[0]}
              </li>
              <li>
                <strong>Actor 2:</strong> {resultTopActors[1]}
              </li>
            </div>
            <div className={classes.totalSharedMovies}>
              <strong>Total shared movies: </strong>
              <span>{resRows.maxCountPairActorsTogether1}</span>
            </div>
            <div className={classes.listOfMovieTitles}>
              <span>List of movie titles:</span>
              <ul>
                {resultMovieList.map((movie, index) => (
                  <li key={index}>{movie}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className={classes.container}>
            <div className={classes.topActorPairContainer}>
              <div>Top Actor Pair</div> <br />
              <li>
                <strong>actor 1:</strong> No that kind of pair actors
              </li>
              <li>
                <strong>actor 2:</strong> No that kind of pair actors
              </li>
            </div>
            <div className={classes.totalSharedMovies}>
              <strong>Total shared movies: </strong>
              none
            </div>
            <div className={classes.listOfMovieTitles}>
              <strong>List of movie titles: </strong>
              none
            </div>
          </div>
        )}
      </div>
    </>
  );
}
