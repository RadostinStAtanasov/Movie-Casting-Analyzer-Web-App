import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function ActorDetailsPage() {
  const params = useParams();
  const id = params.actorId;

  const [rows, setRows] = useState([]);
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

    console.log(actorAllMoviesAndRoles);
    return actorAllMoviesAndRoles;
  }

  const resultActorDetails = actorAllMoviePrayed(rows, id);

  return (
    <>
      <h1>Actor details</h1>
      <ul style={{ textAlign: "center", fontSize: "24px" }}>
        {resultActorDetails.map((item, index) => (
          <li key={index}>
            {item.roleName} | {item.movieId}
          </li>
        ))}
        <Link to=".." relative="path">
          Back
        </Link>
      </ul>
    </>
  );
}
