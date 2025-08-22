import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Movie.module.css";
import { IMAGES_MOVIES } from "../../util/generateImages";
import axios from "axios";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/movies").then(function (response) {
      setMovies(response.data.movies);
    });
  }, []);

  console.log(movies);

  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch("./movies.csv");
  //     const reader = response.body.getReader();
  //     const result = await reader.read(); // raw array
  //     const decoder = new TextDecoder("utf-8");
  //     const csv = decoder.decode(result.value); // the csv text

  //     let arrCsv = csv.split("\r\n");
  //     let firstLineTitles = arrCsv[0].split(",");
  //     let firstTitle = firstLineTitles[0];
  //     let secondTitle = firstLineTitles[1];
  //     let thirdTitle = firstLineTitles[2];
  //     let objCSV = {};
  //     let objCSVArr = [];

  //     for (let i = 1; i < arrCsv.length; i++) {
  //       let row = arrCsv[i].split(",");

  //       objCSV[firstTitle] = row[0];
  //       objCSV[secondTitle] = row[1];
  //       objCSV[thirdTitle] = row[2];

  //       objCSVArr.push(objCSV);
  //       objCSV = {};
  //     }

  //     setRows(objCSVArr);
  //   }
  //   getData();
  // }, []);

  return (
    <div className="app">
      <h1>All Movies</h1>
      <ul>
        {movies.map((item, index) => (
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
