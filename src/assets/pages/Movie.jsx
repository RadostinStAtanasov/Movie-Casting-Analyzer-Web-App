import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Link, useParams } from "react-router-dom";

export default function MoviePage({ id }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("./movies.csv");
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

  return (
    <div className="app">
      <h1>All Movies</h1>
      <ul style={{ textAlign: "center", fontSize: "24px" }}>
        {rows.map((item, index) => (
          <li key={index}>
            <Link to={`/movies/${item.ID}`}>{item.Title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
