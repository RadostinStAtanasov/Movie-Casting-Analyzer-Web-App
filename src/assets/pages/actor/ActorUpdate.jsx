import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  actorAllMoviePrayed,
  getMoviesInActorDetails,
} from "../../util/functionsProcessing";
import classes from "./ActorUpdate.module.css";

export default function ActorUpdatePage() {
  const [roles, setRoles] = useState([]);
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [actorName, setActorName] = useState([]);
  const params = useParams();
  const id = params.actorId;

  let data = {
    actorName: actorName,
  };

  const updateActor = (id, data) => {
    fetch("http://localhost:3000/actors/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actorName: actorName }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch("http://localhost:3000/roles")
      .then((response) => response.json())
      .then((response) => {
        setRoles(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const actorMoviePlayed = actorAllMoviePrayed(roles, id);

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
    actorMoviePlayed
  );

  useEffect(() => {
    fetch("http://localhost:3000/actors")
      .then((response) => response.json())
      .then((response) => {
        setActors(response);
      })
      .catch((err) => console.log(err));
  }, []);

  function actorNameFn(actors, id) {
    let actorName;

    for (let i = 0; i < actors.length; i++) {
      if (id == actors[i].ID) {
        actorName = actors[i].FullName;
      }
    }

    return actorName;
  }
  let resultActorName = actorNameFn(actors, id);

  return (
    <>
      <div className={classes.actorContainer}>
        <div style={{ fontSize: "32px" }}>Actor Update Page</div>
        {
          <p>
            <strong>Your name is:</strong> {resultActorName}
          </p>
        }
        <input
          type="text"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
        />
        {actorName !== "" && (
          <p>
            Your <strong>new</strong> name is: {actorName}.
          </p>
        )}
        <button onClick={() => updateActor(id, data)}>Update name</button>
      </div>

      <ul>
        {resultActorRolesMovies.map((item, index) => (
          <li key={index}>
            <div className={classes.actorsUpdate}>
              <div>{item.Title}</div>
              <input type="text" placeholder={item.Title} />
              <div>{item.Role}</div>
              <input type="text" placeholder={item.Role} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
