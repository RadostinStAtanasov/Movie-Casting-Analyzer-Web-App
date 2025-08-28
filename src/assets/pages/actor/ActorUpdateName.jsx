import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./ActorUpdateName.module.css";
import { Link } from "react-router-dom";

export default function ActorUpdateNamePage() {
  const [actorName, setActorName] = useState([]);
  const [actors, setActors] = useState([]);

  const params = useParams();
  const id = params.actorNameId;

  let dataName = {
    actorName: actorName,
  };

  const updateActor = (id, dataName) => {
    if (dataName.actorName == "") {
      return;
    }
    fetch("http://localhost:3000/actors/updateName/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataName),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/actors")
      .then((response) => response.json())
      .then((response) => {
        setActors(response);
      })
      .catch((err) => console.log(err));
  }, []);

  let actorName2;
  function actorNameFn(actors, id) {
    for (let i = 0; i < actors.length; i++) {
      if (id == actors[i].ID) {
        actorName2 = actors[i].FullName;
      }
    }

    return actorName2;
  }

  let resultActorName = actorNameFn(actors, id);

  return (
    <div className={classes.actorContainer}>
      <div style={{ fontSize: "32px" }}>Actor Update Page</div>
      {
        <p>
          <strong>Your name is: {resultActorName}</strong>
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
      <Link to="../actors">
        <button
          className={classes.actorUpdateNameBtn}
          onClick={() => updateActor(id, dataName)}
        >
          Update Actor Name
        </button>
      </Link>
    </div>
  );
}
