import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./ActorUpdateName.module.css";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export default function ActorUpdateNamePage() {
  const [actorName, setActorName] = useState();
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
      <div>Actor Update Name</div>

      <p style={{ color: "black" }}>
        <strong>Your name is: {resultActorName}</strong>
      </p>

      <TextField
        label="New Name"
        type="text"
        value={actorName}
        onChange={(e) => setActorName(e.target.value)}
      />

      <Link to="../actors">
        <Button
          id={classes.btnUpdateActor}
          variant="contained"
          onClick={() => updateActor(id, dataName)}
        >
          Update Actor Name
        </Button>
      </Link>
      <br />
      <Link to="/actors">
        <Button variant="contained">Back</Button>
      </Link>
    </div>
  );
}
