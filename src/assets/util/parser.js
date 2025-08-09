import { useState, useEffect } from "react";
import Papa from "papaparse";

export function parserData(inputData) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function parserData() {
      const response = await fetch(inputData);
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      console.log(rows);
      setRows(rows);
    }
    //console.log(rows);
    parserData();
  }, []); // [] means just do this once, after initial render
  return rows;
}
