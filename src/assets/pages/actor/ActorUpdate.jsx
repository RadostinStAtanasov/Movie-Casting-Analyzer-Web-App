import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./ActorUpdate.module.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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

  let dataRoleMovieName = {
    actorRole: actorRoleName == " " ? roleActor : actorRoleName,
    movieTitle: actorMovieName == " " ? movieEdit.Title : actorMovieName,
    idActor: idActor,
  };

  const updateActorMovies = (id, dataRoleMovieName) => {
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

  let roleActor;

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
            <div>{movieEdit.Title}</div>
            <input
              type="text"
              value={actorMovieName}
              onChange={(e) => setActorMovieName(e.target.value)}
            />
            {actorMovieName !== "" && (
              <p>
                Your <strong>new</strong> MOVIE TITLE is: {actorMovieName}.
              </p>
            )}
            <br />
            <br />
            <div>{roleActor}</div>
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
            <Link to="../actors">
              <button onClick={() => updateActorMovies(id, dataRoleMovieName)}>
                Update Movie and Role
              </button>
            </Link>
          </div>
        </li>
      </ul>
    </>
  );
}
