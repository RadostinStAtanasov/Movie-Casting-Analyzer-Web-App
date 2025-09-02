import { useLocation } from "react-router-dom";
import { useState } from "react";
import classes from "./MovieUpdate.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function MovieUpdatePage() {
  const [actorRoleName, setActorRoleName] = useState();

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

            <TextField
              label="New Role"
              variant="outlined"
              value={actorRoleName}
              onChange={(e) => setActorRoleName(e.target.value)}
              id={classes.textField}
            />
            <Link to="/movies" relative="path">
              <Button
                variant="contained"
                onClick={() => updateActorMovies(id, dataSend)}
              >
                Update Role
              </Button>
            </Link>
          </div>
        </li>
      </ul>
    </>
  );
}
