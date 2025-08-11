import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function MovieDetailsPage() {
  const params = useParams();
  const id = params.movieId;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../movies.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      console.log(rows);
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

  return (
    <>
      <h1>Detail Page</h1>
      <div style={{ textAlign: "center" }}>
        <p>{resultDetailsMovie.Title}</p>
        <p>{resultDetailsMovie.ReleaseDate}</p>
        <p>
          <Link to=".." relative="path">
            Back
          </Link>
        </p>
      </div>
    </>
  );
}
