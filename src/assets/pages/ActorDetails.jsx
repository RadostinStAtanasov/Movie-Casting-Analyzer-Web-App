import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

    return actorAllMoviesAndRoles;
  }

  const resultActorDetailsRoles = actorAllMoviePrayed(rows, id);

  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../movies.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);

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
      setMovies(objCSVArr);
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

  return (
    <>
      <h1>All movies acted in</h1>
      <ul style={{ textAlign: "center", fontSize: "24px" }}>
        {resultActorRolesMovies.length != 0 ? (
          resultActorRolesMovies.map((item, index) => (
            <li key={index} style={{ color: "orange" }}>
              <span style={{ backgroundColor: "red", fontSize: "24px" }}>
                Movie:
              </span>
              {item.Title}

              <div style={{ backgroundColor: "green", fontSize: "24px" }}>
                Role:
              </div>
              {item.Role == "null" ? (
                <div style={{ backgroundColor: "green", fontSize: "24px" }}>
                  UnNamed
                </div>
              ) : (
                <div style={{ backgroundColor: "green", fontSize: "24px" }}>
                  {item.Role}
                </div>
              )}
            </li>
          ))
        ) : (
          <div>Not Played at any movie</div>
        )}

        <Link to=".." relative="path">
          Back
        </Link>
      </ul>
    </>
  );
}
