import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Link } from "react-router-dom";

export default function ActorPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch("./actors.csv");
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

  return (
    <div className="app">
      <h1>Hello from Actors</h1>
      <ul style={{ textAlign: "center", fontSize: "28px" }}>
        {rows.map((item, index) => (
          <li key={index}>
            <Link to={`/actors/${item.ID}`}>{item.FullName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
