import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Actor.module.css";
import { IMAGES_ACTORS } from "../util/generateImages";

export default function ActorPage() {
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState(IMAGES_ACTORS);

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
    // if (window.confirm("Are you sure you want to delete this row?")) {
    //   // Create a new array to ensure immutability
    //   const updatedData = rows.filter((row) => row.ID !== id);
    //   setData(updatedData); // Update state to trigger re-render
    //   setMessage(`Row with ID ${id} deleted successfully.`);
    // }
    const updateData = rows.filter((row) => row.ID !== id);
    images.splice(rowId, 1);
    // setImages(images);
    setRows(updateData);
  };

  console.log(rows);
  console.log(images);

  return (
    <div className="app">
      <h1>All Actors</h1>
      <ul>
        {rows.length > 0 ? (
          rows.map((item, index) => (
            <li key={index}>
              <div className={classes.images}>
                <Link to={`/actors/${item.ID}`}>
                  <img src={IMAGES_ACTORS[index].image} alt="theRock" />
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
