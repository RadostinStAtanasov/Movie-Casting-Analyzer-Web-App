import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./MovieDetails.module.css";

export default function MovieDetailsPage() {
  const params = useParams();
  const id = params.movieId;
  const [rows, setRows] = useState([]);
  const [movieActorsRoles, setMovieActorsRoles] = useState([]);
  const [movieActorsNames, setMovieActorsNames] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../movies.csv");
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
      setRows(objCSVArr);
    }
    getData();
  }, []);

  function detailsForMovie(rows, id) {
    let movieDetails = {};

    for (let i = 0; i < rows.length; i++) {
      if (+rows[i].ID == id) {
        movieDetails.Id = rows[i].Id;
        movieDetails.Title = rows[i].Title;
        movieDetails.ReleaseDate = rows[i].ReleaseDate;
      }
    }
    return movieDetails;
  }

  const resultDetailsMovie = detailsForMovie(rows, id);

  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../roles.csv");
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
      // console.log(objCSVArr);
      setMovieActorsRoles(objCSVArr);
    }
    getData();
  }, []);

  function movieAllActors(movieActors, id) {
    let allMovieActorsAndRoles = {};
    let allMovieActorsAndRolesArr = [];

    for (let i = 0; i < movieActors.length; i++) {
      if (movieActors[i].MovieID == id) {
        allMovieActorsAndRoles.actorId = movieActors[i].ActorID;
        allMovieActorsAndRoles.role = movieActors[i].RoleName;
        allMovieActorsAndRolesArr.push(allMovieActorsAndRoles);
      }
      allMovieActorsAndRoles = {};
    }

    return allMovieActorsAndRolesArr;
  }

  const resultActorsAndRoles = movieAllActors(movieActorsRoles, id);

  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../actors.csv");
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

      setMovieActorsNames(objCSVArr);
    }
    getData();
  }, []);

  function takeActorsNames(movieActorsNames, resultActorsAndRoles) {
    for (let i = 0; i < movieActorsNames.length; i++) {
      for (let j = 0; j < resultActorsAndRoles.length; j++) {
        if (resultActorsAndRoles[j].actorId == movieActorsNames[i].ID) {
          resultActorsAndRoles[j].actorName = movieActorsNames[i].FullName;
        }
      }
    }
    return resultActorsAndRoles;
  }

  const resultMovieActorRoles = takeActorsNames(
    movieActorsNames,
    resultActorsAndRoles
  );

  return (
    <>
      <h1>Movie Details</h1>
      <div className={classes.centerText}>
        <div className={classes.title}>
          <h2>Title </h2>
          <div>{resultDetailsMovie.Title}</div>
        </div>
        <div className={classes.releaseDate}>
          <h2>Release date </h2>
          <div className="">{resultDetailsMovie.ReleaseDate}</div>
        </div>
        <div className={classes.containerActors}>
          <ul className={classes.ulList}>
            <span>Actors</span>
            {resultMovieActorRoles.map((movie, index) => (
              <li key={index}>
                <div>{movie.actorName}</div>
                <div>
                  Role:
                  {movie.role == "null" ? (
                    <div style={{ color: "red" }}>UnNamed</div>
                  ) : (
                    <div>{movie.role}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Link to=".." relative="path">
            <button>Back</button>
          </Link>
        </div>
      </div>
    </>
  );
}
