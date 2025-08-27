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
  const [actors, setActors] = useState([]);

  const deleteActor = (id) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      fetch("http://localhost:3000/actors/" + id, {
        method: "DELETE",
      })
        .then(() => console.log("removed"))
        .catch((error) => console.log(error));
    }
  };

  //roles
  useEffect(() => {
    fetch("http://localhost:3000/roles")
      .then((response) => response.json())
      .then((response) => {
        setRows(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const resultActorDetailsRoles = actorAllMoviePrayed(rows, id);

  //movies
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

  useEffect(() => {
    fetch("http://localhost:3000/actors")
      .then((response) => response.json())
      .then((response) => {
        setActors(response);
      })
      .catch((error) => console.log(error));
  }, []);

  let actorName;

  for (let i = 0; i < actors.length; i++) {
    if (actors[i].ID === id) {
      actorName = actors[i].FullName;
    }
  }

  return (
    <>
      <h1>All movies acted in</h1>
      <h2 style={{ textAlign: "center" }}>{actorName}</h2>
      <Link to={`/actors/updateName/${id}`}>
        <button className={classes.btnChangeActorName} type="button">
          Change Actor Name
        </button>
      </Link>
      <br />
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
                <br />
              </div>
              <Link to={`/actors/update/${item.ID}`} state={{ idActor: id }}>
                <button className={classes.updateActor}>
                  Update Role and Movie
                </button>
              </Link>
            </li>
          ))
        ) : (
          <div>Not Played at any movie</div>
        )}
        <button className={classes.deleteActor} onClick={() => deleteActor(id)}>
          Delete Actor
        </button>
        <Link to=".." relative="path">
          <button type="button" className={classes.detailsMovie}>
            Back
          </button>
        </Link>
      </ul>
    </>
  );
}
