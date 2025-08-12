import { useState, useEffect } from "react";
// Papa from "papaparse";
import { Link } from "react-router-dom";

export default function MoviePage({ id }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("./movies.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text

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

      setRows(objCSVArr);
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
