import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./MovieUpdate.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function MovieUpdatePage() {
  const [actorRoleName, setActorRoleName] = useState([]);
  const [actorMovieName, setActorMovieName] = useState([]);

  const params = useParams();
  const id = params.movieId;

  const location = useLocation();
  const movieId = location.state.movieId;
  const role = location.state.role;

  const dataSend = {
    movieId: movieId,
    newRoleName: actorRoleName,
  };

  const updateActorMovies = (id, dataSend) => {
    fetch("http://localhost:3000/movies/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    })
      .then(() => console.log("tuka li sme"))
      .catch((err) => console.log(err));

    console.log("stawa li ");
  };

  return (
    <>
      <ul>
        <li>
          <div className={classes.actorsUpdate}>
            <p>Your role is: {role}</p>
            <input
              type="text"
              value={actorRoleName}
              onChange={(e) => setActorRoleName(e.target.value)}
            />
            {actorRoleName !== "" && (
              <p>
                Your <strong>new</strong> ROLE is: {actorRoleName}.
              </p>
            )}
            <br />
            <Link to="..">
              <button
                className={classes.updateBtnRoleMovie}
                onClick={() => updateActorMovies(id, dataSend)}
              >
                Update Role
              </button>
            </Link>
          </div>
        </li>
      </ul>
    </>
  );
}
