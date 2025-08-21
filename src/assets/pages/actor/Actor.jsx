import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Actor.module.css";
import { IMAGES_ACTORS } from "../../util/generateImages";
import newActorImage from "../../images/newActorImage.jpg";
import Papa from "papaparse";

export default function ActorPage() {
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState([...IMAGES_ACTORS]);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch("./actors.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text

      let arrCsv = csv.split("\r\n");
      let firstLineTitles = arrCsv[0].split(",");
      let firstTitle = firstLineTitles[0];
      let secondTitle = firstLineTitles[1];
      let thirdTitle = firstLineTitles[2];
      let objCSV = {};
      let objCSVArr = [];

      for (let i = 1; i < arrCsv.length; i++) {
        let row = arrCsv[i].split(",");

        objCSV[firstTitle] = row[0];
        objCSV[secondTitle] = row[1];
        objCSV[thirdTitle] = row[2];

        objCSVArr.push(objCSV);
        objCSV = {};
      }

      setRows(objCSVArr);
      setImages([...IMAGES_ACTORS]);
    }
    getData();
  }, []);

  const deleteActor = (id, rowId) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      // Create a new array to ensure immutability
      const updatedData = rows.filter((row) => row.ID !== id);
      setRows(updatedData); // Update state to trigger re-render
      images.splice(rowId, 1);
    }
  };

  const addActor = () => {
    if (fullName == "" || birthDate == "") {
      return;
    }
    const id = rows.length + 1;
    const actor = { ID: id, FullName: fullName, BirthDate: birthDate };
    const newPictureActor = { image: newActorImage };

    setRows([actor, ...rows]);
    setImages([newPictureActor, ...images]);
    setFullName("");
    setBirthDate("");
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
                <button
                  className={classes.deleteActor}
                  onClick={() => deleteActor(item.ID, index)}
                >
                  Delete Actor
                </button>
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
