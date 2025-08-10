import { useState, useEffect } from "react";
import Papa from "papaparse";

export function parserData() {
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

  return rows;
}
