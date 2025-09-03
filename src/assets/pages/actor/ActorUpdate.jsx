import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./ActorUpdate.module.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function ActorUpdatePage(props) {
  const [roles, setRoles] = useState([]);
  const [movies, setMovies] = useState([]);
  const [actorRoleName, setActorRoleName] = useState([]);
  const [actorMovieName, setActorMovieName] = useState([]);

  const params = useParams();
  const id = params.actorId;
  const location = useLocation();
  const idActor = location.state.idActor;

  let movieEdit = {};
  let roleActor;

  let dataRoleMovieName = {
    actorRole: actorRoleName,
    movieTitle: actorMovieName,
    idActor: idActor,
  };

  const updateActorMovies = (id, dataRoleMovieName) => {
    if (actorRoleName == "" || actorMovieName == "") {
      return;
    }

    fetch("http://localhost:3000/actors/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRoleMovieName),
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  //roles
  useEffect(() => {
    fetch("http://localhost:3000/roles")
      .then((response) => response.json())
      .then((response) => {
        setRoles(response);
      })
      .catch((err) => console.log(err));
  }, []);

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].MovieID === id && roles[i].ActorID === idActor) {
      roleActor = roles[i].RoleName;
    }
  }

  //movies
  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((response) => {
        setMovies(response);
      })
      .catch((err) => console.log(err));
  }, []);

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].ID === id) {
      movieEdit.ID = movieEdit.ID;
      movieEdit.Title = movies[i].Title;
    }
  }

  return (
    <>
      <ul>
        <li>
          <div className={classes.actorsUpdate}>
            <div className={classes.textColor}>
              Your Title is:{movieEdit.Title}
            </div>
            <TextField
              label="New title"
              type="text"
              value={actorMovieName}
              onChange={(e) => setActorMovieName(e.target.value)}
            />
            <br />
            <br />
            <div className={classes.textColor}>Your Role is:{roleActor}</div>
            <TextField
              label="New role"
              type="text"
              value={actorRoleName}
              onChange={(e) => setActorRoleName(e.target.value)}
            />
            <br />
            <Link
              to="/actors"
              relative="path"
              className={classes.updateBtnRoleMovie}
            >
              <Button
                variant="contained"
                onClick={() => updateActorMovies(id, dataRoleMovieName)}
              >
                Update Movie and Role
              </Button>
            </Link>
          </div>
          <Link to="/actors" path="relative">
            <Button variant="contained">Back</Button>
          </Link>
        </li>
      </ul>
    </>
  );
}
