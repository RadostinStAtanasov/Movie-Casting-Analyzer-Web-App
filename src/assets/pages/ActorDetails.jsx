import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./ActorDetails.module.css";
import {
  actorAllMoviePrayed,
  getMoviesInActorDetails,
} from "../util/functionsProcessing";

export default function ActorDetailsPage() {
  const params = useParams();
  const id = params.actorId;

  const [rows, setRows] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../roles.csv"); //get request
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text

      let arrCsv = csv.split("\r\n");
      let firstLineTitles = arrCsv[0].split(",");
      let firstTitle = firstLineTitles[0];
      let secondTitle = firstLineTitles[1];
      let thirdTitle = firstLineTitles[2];
      let forthTitle = firstLineTitles[3];
      let objCSV = {};
      let objCSVArr = [];

      for (let i = 1; i < arrCsv.length; i++) {
        let row = arrCsv[i].split(",");

        objCSV[firstTitle] = row[0];
        objCSV[secondTitle] = row[1];
        objCSV[thirdTitle] = row[2];
        objCSV[forthTitle] = row[3];

        objCSVArr.push(objCSV);
        objCSV = {};
      }
      //console.log(objCSVArr);

      setRows(objCSVArr);
    }
    getData();
  }, []);

  const resultActorDetailsRoles = actorAllMoviePrayed(rows, id);

  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../movies.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);

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
      setMovies(objCSVArr);
    }
    getData();
  }, []);

  const resultActorRolesMovies = getMoviesInActorDetails(
    movies,
    resultActorDetailsRoles
  );

  return (
    <>
      <h1>All movies acted in</h1>
      <ul className={classes.ulList}>
        {resultActorRolesMovies.length != 0 ? (
          resultActorRolesMovies.map((item, index) => (
            <li key={index}>
              <div className={classes.movieDetailMovie}>
                <span>Movie </span>
                <div>{item.Title}</div>
                <div className={classes.roleChange}>Role</div>
                {item.Role == "null" ? (
                  <div>UnNamed</div>
                ) : (
                  <div>{item.Role}</div>
                )}
              </div>
            </li>
          ))
        ) : (
          <div>Not Played at any movie</div>
        )}

        <Link to=".." relative="path">
          <button type="button" className={classes.detailsMovie}>
            Back
          </button>
        </Link>
      </ul>
    </>
  );
}
