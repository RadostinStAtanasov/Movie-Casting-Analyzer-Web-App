import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function ActorDetailsPage() {
  const params = useParams();
  const id = params.actorId;

  const [rows, setRows] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../roles.csv"); //get request
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      //console.log(rows);
      setRows(rows);
    }
    getData();
  }, []);

  function actorAllMoviePrayed(rows, id) {
    let actorAllMoviesAndRoles = [];
    let actorMovieRoles = {};

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].ActorID == id) {
        actorMovieRoles.movieId = rows[i].MovieID;
        actorMovieRoles.roleName = rows[i].RoleName;
        actorAllMoviesAndRoles.push(actorMovieRoles);
      }
      actorMovieRoles = {};
    }

    //console.log(actorAllMoviesAndRoles);
    return actorAllMoviesAndRoles;
  }

  const resultActorDetailsRoles = actorAllMoviePrayed(rows, id);

  //console.log(resultActorDetailsRoles);

  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../movies.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      const results = Papa.parse(csv, { header: true });
      const movies = results.data;
      //console.log(movies);
      setMovies(movies);
    }
    getData();
  }, []);

  function getMoviesInActorDetails(movies, resultActorDetailsRoles) {
    let moviesActorActedAndRoles = [];
    let actorMoviesAndRoles = {};

    for (let i = 0; i < movies.length; i++) {
      for (let j = 0; j < resultActorDetailsRoles.length; j++) {
        if (+movies[i].ID == resultActorDetailsRoles[j].movieId) {
          actorMoviesAndRoles.Title = movies[i].Title;
          actorMoviesAndRoles.Role = resultActorDetailsRoles[j].roleName;
          moviesActorActedAndRoles.push(actorMoviesAndRoles);
        }
        actorMoviesAndRoles = {};
      }
    }
    return moviesActorActedAndRoles;
  }

  const resultActorRolesMovies = getMoviesInActorDetails(
    movies,
    resultActorDetailsRoles
  );

  // let renderResult;

  // if (resultActorRolesMovies) {
  //   renderResult = resultActorRolesMovies.map((item, index) => (
  //     <li key={index}>
  //       Movie: {item.Title} <br />
  //       Role: {item.Role}
  //     </li>
  //   ));
  // }

  return (
    <>
      <h1>Actor details</h1>
      <ul style={{ textAlign: "center", fontSize: "24px" }}>
        {resultActorRolesMovies &&
          resultActorRolesMovies.map((item, index) => (
            <li key={index}>
              Movie: {item.Title} <br />
              Role:
              {item.Role == "null" ? (
                <div>UnNamed</div>
              ) : (
                <div>{item.Role}</div>
              )}
            </li>
          ))}
        <div>Not Played at any movie</div>
        <Link to=".." relative="path">
          Back
        </Link>
      </ul>
    </>
  );
}
