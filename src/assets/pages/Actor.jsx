import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Actor.module.css";
import { IMAGES_ACTORS } from "../util/generateImages";

export default function ActorPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch("./actors.csv");
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
      <h1>All Actors</h1>
      <ul>
        {rows.map((item, index) => (
          <li key={index}>
            <div className={classes.images}>
              <Link to={`/actors/${item.ID}`}>
                <img src={IMAGES_ACTORS[index].image} alt="theRock" />
                {item.FullName}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
