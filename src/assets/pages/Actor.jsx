import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Actor.module.css";
import { IMAGES_ACTORS } from "../util/generateImages";
import newActorImage from "../images/newActorImage.jpg";

export default function ActorPage() {
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState([IMAGES_ACTORS]);
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
      //console.log(objCSVArr);

      setRows(objCSVArr);
    }
    getData();
  }, []);

  // // Define column headers for CSV
  // const fileHeaders = ["ID", "FullName", "BirthDate"];

  // // Function to convert JSON to CSV string
  // function convertJSONToCSV(inputRows, columnHeaders) {
  //   // Check if JSON data is empty
  //   if (inputRows.length === 0) {
  //     return "";
  //   }

  //   // Create headers string
  //   const headers = columnHeaders.join(",") + "\n";

  //   // Map JSON data to CSV rows
  //   const rows = inputRows
  //     .map((row) => {
  //       // Map each row to CSV format
  //       return columnHeaders.map((field) => row[field] || "").join(",");
  //     })
  //     .join("\n");

  //   // Combine headers and rows
  //   return headers + rows;
  // }

  // const resultCSVFile = convertJSONToCSV(rows, fileHeaders);

  // console.log(resultCSVFile);

  const deleteActor = (id, rowId) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      // Create a new array to ensure immutability
      const updatedData = rows.filter((row) => row.ID !== id);
      setRows(updatedData); // Update state to trigger re-render
      images.splice(rowId, 1);
    }
  };

  const addActor = () => {
    const id = rows.length;
    const actor = { ID: id, FullName: fullName, BirthDate: birthDate };
    const newPictureActor = { image: newActorImage };

    setRows([actor, ...rows]);
    // setImages([newPictureActor, ...IMAGES_ACTORS]);
    IMAGES_ACTORS.unshift(newPictureActor);
    setFullName("");
    setBirthDate("");

    //console.log(actor);
    console.log(rows);
    console.log(IMAGES_ACTORS);
  };

  return (
    <div className="app">
      <h1>All Actors</h1>

      <label htmlFor="">FullName</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <br />
      <label htmlFor="">BirthDate (yyyy-mm-dd)</label>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <br />
      <button type="submit" onClick={addActor}>
        Add Actor
      </button>

      <ul>
        {rows.length > 0 ? (
          rows.map((item, index) => (
            <li key={index}>
              <div className={classes.images}>
                <Link to={`/actors/${item.ID}`}>
                  <img
                    src={
                      index < IMAGES_ACTORS.length
                        ? IMAGES_ACTORS[index].image
                        : IMAGES_ACTORS[index - index].image
                    }
                    alt="theRock"
                  />
                  {item.FullName}
                </Link>
                <button onClick={() => deleteActor(item.ID, index)}>
                  Delete
                </button>
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
