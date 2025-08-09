import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function MoviePage() {
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
      setRows(rows);
    }
    getData();
  }, []);

  return (
    <div className="app">
      <h1>Movie Page</h1>
      <h1>Hello from parse</h1>
      <ul>
        {rows.map((item, index) => (
          <li key={index}>
            {item.ID} | {item.Title} | {item.ReleaseDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
