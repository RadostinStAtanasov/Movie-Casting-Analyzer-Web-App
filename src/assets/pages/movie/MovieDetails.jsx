import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./MovieDetails.module.css";
import {
  detailsForMovie,
  movieAllActors,
  takeActorsNames,
} from "../../util/functionsProcessing";

export default function MovieDetailsPage() {
  const params = useParams();
  const id = params.movieId;
  const [rows, setRows] = useState([]);
  const [movieActorsRoles, setMovieActorsRoles] = useState([]);
  const [movieActorsNames, setMovieActorsNames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((response) => {
        setRows(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const resultDetailsMovie = detailsForMovie(rows, id);

  useEffect(() => {
    fetch("http://localhost:3000/roles")
      .then((response) => response.json())
      .then((response) => {
        setMovieActorsRoles(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const resultActorsAndRoles = movieAllActors(movieActorsRoles, id);

  useEffect(() => {
    fetch("http://localhost:3000/actors")
      .then((response) => response.json())
      .then((response) => {
        setMovieActorsNames(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const resultMovieActorRoles = takeActorsNames(
    movieActorsNames,
    resultActorsAndRoles
  );

  function deleteActor(id) {
    if (windows.confirm("Are you sure you want to delete this?")) {
      fetch("http://localhost:3000/movies" + id, {
        method: "DELETE",
      })
        .then(() => console.log("removed"))
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <h1>Movie Details</h1>

      <br />
      <div className={classes.centerText}>
        <div className={classes.title}>
          <h2>Title </h2>
          <div>{resultDetailsMovie.Title}</div>
        </div>
        <div className={classes.releaseDate}>
          <h2>Release date </h2>
          <div className="">{resultDetailsMovie.ReleaseDate}</div>
        </div>
        <div className={classes.containerActors}>
          <ul className={classes.ulList}>
            <span>Actors</span>
            {resultMovieActorRoles.map((movie, index) => (
              <li key={index}>
                <div>{movie.actorName}</div>
                <div>
                  Role:
                  {movie.role == "null" ? (
                    <div style={{ color: "red" }}>UnNamed</div>
                  ) : (
                    <div>{movie.role}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <br />
          <button
            className={classes.deleteMovie}
            onClick={() => deleteActor(id)}
          >
            Delete Movie
          </button>
          <br />
          <Link to={`/movies/update/` + id}>
            <button className={classes.movieDetailsUpdate}>
              Update Title, Date, Actors, Roles
            </button>
          </Link>
          <br />
          <Link to=".." relative="path">
            <button className={classes.movieDetails}>Back</button>
          </Link>
        </div>
      </div>
    </>
  );
}
