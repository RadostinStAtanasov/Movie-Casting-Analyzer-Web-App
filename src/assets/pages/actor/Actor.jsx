import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Actor.module.css";
import { IMAGES_ACTORS } from "../../util/generateImages";
import newActorImage from "../../images/newActorImage.jpg";
import axios from "axios";

export default function ActorPage() {
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState([...IMAGES_ACTORS]);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/actors")
      .then((response) => response.json())
      .then((response) => {
        setRows(response);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(rows);

  // useEffect(() => {
  //   axios.get("http://localhost:3000/actors").then(function (response) {
  //     setRows(response.data);
  //   });
  // }, []);

  const addActor = () => {
    if (fullName == "" || birthDate == "") {
      return;
    }
    const id = rows.length + 1;
    const actor = { ID: id, FullName: fullName, BirthDate: birthDate };

    fetch("http://localhost:3000/actors", {
      method: "POST",
      body: JSON.stringify(actor),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const updateActor = () => {};

  return (
    <div className="app">
      <h1>All Actors</h1>
      <div className={classes.inputForm}>
        <label htmlFor="">FullName: </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <br />
        <label htmlFor="">BirthDate: </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <br />
        <button type="submit" className={classes.btn} onClick={addActor}>
          Add Actor
        </button>
      </div>

      <ul>
        {rows.length > 0 ? (
          rows.map((item, index) => (
            <li key={index}>
              <div className={classes.images}>
                <Link to={`/actors/${item.ID}`}>
                  <img
                    src={
                      index < images.length
                        ? images[index].image
                        : images[index - index].image
                    }
                    alt="theRock"
                  />
                  {item.FullName}
                </Link>

                <Link to={`/actors/update/${item.ID}`}>
                  <button
                    className={classes.updateActor}
                    onClick={() => updateActor(item.ID)}
                  >
                    Update Actor
                  </button>
                </Link>
              </div>
            </li>
          ))
        ) : (
          <p>No data loaded.</p>
        )}
      </ul>
    </div>
  );
}
