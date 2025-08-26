import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./ActorDetails.module.css";
import {
  actorAllMoviePrayed,
  getMoviesInActorDetails,
} from "../../util/functionsProcessing";

export default function ActorDetailsPage() {
  const params = useParams();
  const id = params.actorId;

  const [rows, setRows] = useState([]);
  const [movies, setMovies] = useState([]);

  const deleteActor = (id) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      fetch("http://localhost:3000/actors/" + id, {
        method: "DELETE",
      })
        .then(() => console.log("removed"))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/roles")
      .then((response) => response.json())
      .then((response) => {
        setRows(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const resultActorDetailsRoles = actorAllMoviePrayed(rows, id);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((response) => {
        setMovies(response);
      })
      .catch((err) => console.log(err));
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
        <button className={classes.deleteActor} onClick={() => deleteActor(id)}>
          Delete Actor
        </button>
        <Link to={`/actors/update/${id}`}>
          <button className={classes.updateActor}>Update Actor</button>
        </Link>
        <Link to=".." relative="path">
          <button type="button" className={classes.detailsMovie}>
            Back
          </button>
        </Link>
      </ul>
    </>
  );
}
