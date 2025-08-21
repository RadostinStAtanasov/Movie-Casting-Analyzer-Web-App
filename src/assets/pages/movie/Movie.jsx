import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Movie.module.css";
import { IMAGES_MOVIES } from "../../util/generateImages";

export default function MoviePage() {
  const [rows, setRows] = useState([]);

  const [actorss, setActors] = useState([]);

  // useEffect(() => {
  //   async function getData() {
  //     let response = await fetch("./actors.csv");
  //     const reader = response.body.getReader();
  //     const result = await reader.read(); // raw array
  //     const decoder = new TextDecoder("utf-8");
  //     const csv = decoder.decode(result.value); // the csv text
  //     const results = Papa.parse(csv, { header: true });
  //     const actors = results.data;

  //     const unparsedResult = Papa.unparse(actors, {
  //       header: true,
  //       delimiter: ".",
  //     });
  //     console.log(unparsedResult);

  //     console.log(response);

  //     setActors(actors);
  //   }
  //   getData();
  // }, []);

  //console.log(actorss);

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

      setRows(objCSVArr);
    }
    getData();
  }, []);

  return (
    <div className="app">
      <h1>All Movies</h1>
      <ul>
        {rows.map((item, index) => (
          <li key={index}>
            <div className={classes.images}>
              <Link to={`/movies/${item.ID}`}>
                <img src={IMAGES_MOVIES[index].image} alt="" />
                {item.Title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
