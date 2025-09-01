import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Actor.module.css";
import { IMAGES_ACTORS } from "../../util/generateImages";
import newActorImage from "../../images/newActorImage.jpg";

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

  //console.log(rows);

  // function papaNotParser(rows) {
  //   let arrCsv = rows.split("\r\n");
  //   let firstLineTitles = arrCsv[0].split(",");
  //   let firstTitle = firstLineTitles[0];
  //   let secondTitle = firstLineTitles[1];
  //   let thirdTitle = firstLineTitles[2];
  //   let objCSV = {};
  //   let objCSVArr = [];

  //   for (let i = 1; i < arrCsv.length; i++) {
  //     let row = arrCsv[i].split(",");

  //     objCSV[firstTitle] = row[0];
  //     objCSV[secondTitle] = row[1];
  //     objCSV[thirdTitle] = row[2];

  //     objCSVArr.push(objCSV);
  //     objCSV = {};
  //   }

  //   console.log(objCSVArr);
  // }

  // papaNotParser(rows);

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
        <Link to="..">
          <button type="submit" className={classes.btn} onClick={addActor}>
            Add Actor
          </button>
        </Link>
      </div>

      <ul>
        {rows.length > 0 ? (
          rows.map((item, index) => (
            <li key={index}>
              <div className={classes.images}>
                <Link to={`/actors/${item.ID}`}>
                  {item.ID > index ? (
                    <img src={newActorImage} />
                  ) : (
                    <img src={images[index].image} alt="theRock" />
                  )}

                  {item.FullName}
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
