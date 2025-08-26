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

  const updateActor = (id, actorName) => {
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

  //roles
  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../../roles.csv"); //get request
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text

      let arrCsv = csv.split("\r\n");
      let firstLineTitles = arrCsv[0].split(",");
      let firstTitle = firstLineTitles[0];
      let secondTitle = firstLineTitles[1];
      let thirdTitle = firstLineTitles[2];
      let forthTitle = firstLineTitles[3];
      let objCSV = {};
      let objCSVArr = [];

      for (let i = 1; i < arrCsv.length; i++) {
        let row = arrCsv[i].split(",");

        objCSV[firstTitle] = row[0];
        objCSV[secondTitle] = row[1];
        objCSV[thirdTitle] = row[2];
        objCSV[forthTitle] = row[3];

        objCSVArr.push(objCSV);
        objCSV = {};
      }
      //console.log(objCSVArr);

      setRoles(objCSVArr);
      //console.log(roles);
    }
    getData();
  }, []);

  const actorMoviePlayed = actorAllMoviePrayed(roles, id);
  //console.log(actorMoviePlayed);

  //movies
  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../../movies.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);

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
      setMovies(objCSVArr);
    }
    getData();
  }, []);

  const resultActorRolesMovies = getMoviesInActorDetails(
    movies,
    actorMoviePlayed
  );
  //console.log(resultActorRolesMovies);

  //actors
  useEffect(() => {
    async function getData() {
      const response = await fetch("../../../../actors.csv");
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
      setActors(objCSVArr);
    }
    getData();
  }, []);

  //console.log(actors);

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
  //console.log(actorName);
  //console.log(resultActorRolesMovies[1]);

  return (
    <>
      <div className={classes.actorContainer}>
        <div style={{ fontSize: "32px" }}>Actor Update Page</div>
        {/* <label htmlFor="">Actor name</label> */}
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
        <button onClick={() => updateActor(id, actorName)}>Update name</button>
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
