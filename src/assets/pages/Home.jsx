import { useState, useEffect } from "react";
import classes from "./Home.module.css";
import {
  listOfMovieTitles,
  getTopactorsNames,
  topActorPair,
} from "../util/functionsProcessing";
import axios from "axios";

export default function HomePage() {
  const [rows, setRows] = useState([]);
  const [actors, setActors] = useState([]);
  const [listMoviesTitles, setListMoviesTitles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/roles").then(function (response) {
      setRows(response.data);
    });
  }, []);

  const resRows = topActorPair(rows);

  useEffect(() => {
    axios.get("http://localhost:3000/actors").then(function (response) {
      setActors(response.data);
    });
  }, []);

  const resultTopActors = getTopactorsNames(resRows, actors);

  useEffect(() => {
    axios.get("http://localhost:3000/movies").then(function (response) {
      setListMoviesTitles(response.data);
    });
  }, []);

  let resultMovieList = listOfMovieTitles(listMoviesTitles, resRows);

  return (
    <>
      <h1 className={classes.title}>
        <span>Movie Casting</span> Analyze Web
      </h1>

      <div className={classes.container}>
        {resultMovieList.length != 0 ? (
          <div className={classes.topActorPair}>
            <div className={classes.topActorPairContainer}>
              <div>Top Actor Pair</div>
              <li>
                <strong>Actor 1:</strong> {resultTopActors[0]}
              </li>
              <li>
                <strong>Actor 2:</strong> {resultTopActors[1]}
              </li>
            </div>
            <div className={classes.totalSharedMovies}>
              <strong>Total shared movies: </strong>
              <span>{resRows.maxCountPairActorsTogether1}</span>
            </div>
            <div className={classes.listOfMovieTitles}>
              <span>List of movie titles:</span>
              <ul>
                {resultMovieList.map((movie, index) => (
                  <li key={index}>{movie}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className={classes.container}>
            <div className={classes.topActorPairContainer}>
              <div>Top Actor Pair</div> <br />
              <li>
                <strong>actor 1:</strong> No that kind of pair actors
              </li>
              <li>
                <strong>actor 2:</strong> No that kind of pair actors
              </li>
            </div>
            <div className={classes.totalSharedMovies}>
              <strong>Total shared movies: </strong>
              none
            </div>
            <div className={classes.listOfMovieTitles}>
              <strong>List of movie titles: </strong>
              none
            </div>
          </div>
        )}
      </div>
    </>
  );
}
