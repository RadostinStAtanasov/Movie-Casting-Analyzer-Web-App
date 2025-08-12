import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from "papaparse";

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
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      //console.log(rows);
      // console.log(csv.split(","));
      setRows(rows);
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
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      //console.log(rows);
      // console.log(csv.split(","));
      setMovieActorsRoles(rows);
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
        console.log(allMovieActorsAndRoles);
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
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      //console.log(rows);
      // console.log(csv.split(","));
      setMovieActorsNames(rows);
    }
    getData();
  }, []);

  function takeActorsNames(movieActorsNames, resultActorsAndRoles) {
    for (let i = 0; i < movieActorsNames.length; i++) {
      for (let j = 0; j < resultActorsAndRoles.length; j++) {
        if (resultActorsAndRoles[j].actorId == movieActorsNames[i].ID) {
          resultActorsAndRoles[j].actorName = movieActorsNames[i].FullName;
          console.log(movieActorsNames[i].FullName);
        }
      }
    }
    console.log(resultActorsAndRoles);
    return resultActorsAndRoles;
  }

  const resultMovieActorRoles = takeActorsNames(
    movieActorsNames,
    resultActorsAndRoles
  );

  return (
    <>
      <h1>Detail Page</h1>
      <div style={{ textAlign: "center" }}>
        <p>Title: {resultDetailsMovie.Title}</p>
        <p>Release date: {resultDetailsMovie.ReleaseDate}</p>
        {/* <p>Cast: {resultDetailsMovie.Roles}</p> */}
        <p>
          <ul>
            {resultMovieActorRoles.map((movie, index) => (
              <li key={index}>
                Actor name: {movie.actorName} <br />
                Role:
                {movie.role == "null" ? (
                  <div>UnNamed</div>
                ) : (
                  <div>{movie.role}</div>
                )}
              </li>
            ))}
            <li></li>
          </ul>
          <Link to=".." relative="path">
            Back
          </Link>
        </p>
      </div>
    </>
  );
}
