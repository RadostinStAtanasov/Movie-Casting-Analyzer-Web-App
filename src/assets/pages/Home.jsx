import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function HomePage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("./roles.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      console.log(rows);
      setRows(rows);
    }
    getData();
  }, []);

  function topActorPair(rows) {
    let firstActorCheck;
    let secondActorCheck;
    let countPairActorsTogether = 0;
    let maxCountPairActorsTogether = 0;
    let firstActorId = firstActorCheck;
    let secondActorId = secondActorCheck;
    let moviesPlayedTogether = [];
    let checkIsEqualToFirst;
    let checkIsEqualToSecond;
    let result = {};

    // result = {
    //   firstActor: firstActorId,
    //   secondActor: secondActor2,
    //   moviesPlayedTogether: moviesPlayedTogether,
    //   maxCountPairActorsTogether: maxCountPairActorsTogether,
    // };

    for (let i = 0; i < rows.length; i++) {
      firstActorCheck = +rows[i].ActorID; // first Actor id
      let firstActorMovieID = +rows[i].MovieID;

      if (moviesPlayedTogether.length == 1) {
        moviesPlayedTogether = [];
        firstActorId = null;
        secondActorId = null;
        maxCountPairActorsTogether = 0;
      }

      for (let j = i + 1; j < rows.length; j++) {
        secondActorCheck = +rows[j].ActorID; // second actor id
        let secondActorMovieID = +rows[j].MovieID;

        if (firstActorMovieID !== secondActorMovieID) {
          break;
        }

        countPairActorsTogether = 0;
        for (let l = 0; l < rows.length - 1; l++) {
          checkIsEqualToFirst = +rows[l].ActorID;
          checkIsEqualToSecond = +rows[l + 1].ActorID;
          if (
            firstActorCheck == checkIsEqualToFirst &&
            secondActorCheck == checkIsEqualToSecond &&
            rows[l].MovieID == rows[l + 1].MovieID
          ) {
            countPairActorsTogether++;
            if (countPairActorsTogether > maxCountPairActorsTogether) {
              maxCountPairActorsTogether = countPairActorsTogether;
              firstActorId = +rows[l].ActorID;
              secondActorId = +rows[l + 1].ActorID;
              moviesPlayedTogether.push(+rows[l].MovieID);
            }
          } else if (
            secondActorCheck == checkIsEqualToFirst &&
            firstActorCheck == checkIsEqualToSecond &&
            rows[l].MovieID == rows[l + 1].MovieID
          ) {
            countPairActorsTogether++;
            if (countPairActorsTogether > maxCountPairActorsTogether) {
              maxCountPairActorsTogether = countPairActorsTogether;
              firstActorId = +rows[l].ActorID;
              secondActorId = +rows[l + 1].ActorID;
              moviesPlayedTogether.push(+rows[l].MovieID);
            }
          }
        }

        //console.log(
        //maxCountPairActorsTogether,
        //moviesPlayedTogether,
        // rows[j].ID,
        // rows[j].ActorID,
        // rows[j].MovieID,
        // rows[j].RoleName
        //);
      }
    }
    result.firstActor = firstActorId;
    result.secondActor = secondActorId;
    result.moviesPlayedTogether1 = moviesPlayedTogether;
    result.maxCountPairActorsTogether1 = maxCountPairActorsTogether;
    console.log(
      `max pairs actors ${maxCountPairActorsTogether}, first actor ${firstActorId}, second actor ${secondActorId}, movie prayed together ${moviesPlayedTogether}`
    );
    return result;
  }
  const resRows = topActorPair(rows);

  // function topActorPairReverse(rows) {
  //   let firstActorCheck;
  //   let secondActorCheck;
  //   let countPairActorsTogether = 0;
  //   let maxCountPairActorsTogether = 0;
  //   let firstActorId = firstActorCheck;
  //   let secondActorId = secondActorCheck;
  //   let moviesPlayedTogether = [];
  //   let checkIsEqualToFirst;
  //   let checkIsEqualToSecond;

  //   for (let i = rows.length - 1; i > 0; i--) {
  //     firstActorCheck = +rows[i].ActorID; // first Actor id
  //     let firstActorMovieID = +rows[i].MovieID;

  //     if (moviesPlayedTogether.length == 1) {
  //       moviesPlayedTogether = [];
  //       firstActorId = null;
  //       secondActorId = null;
  //       maxCountPairActorsTogether = 0;
  //     }

  //     for (let j = rows.length - 2; j > 0; j--) {
  //       secondActorCheck = +rows[j].ActorID; // second actor id
  //       let secondActorMovieID = +rows[j].MovieID;

  //       if (firstActorMovieID !== secondActorMovieID) {
  //         break;
  //       }

  //       countPairActorsTogether = 0;
  //       for (let l = rows.length - 1; l > 0; l--) {
  //         checkIsEqualToFirst = +rows[l - 1].ActorID;
  //         checkIsEqualToSecond = +rows[l].ActorID;
  //         if (
  //           firstActorCheck == checkIsEqualToFirst &&
  //           secondActorCheck == checkIsEqualToSecond &&
  //           rows[l].MovieID == rows[l - 1].MovieID
  //         ) {
  //           countPairActorsTogether++;
  //           if (countPairActorsTogether > maxCountPairActorsTogether) {
  //             maxCountPairActorsTogether = countPairActorsTogether;
  //             firstActorId = +rows[l].ActorID;
  //             secondActorId = +rows[l - 1].ActorID;
  //             moviesPlayedTogether.push(+rows[l].MovieID);
  //           }
  //         } else if (
  //           secondActorCheck == checkIsEqualToFirst &&
  //           firstActorCheck == checkIsEqualToSecond &&
  //           rows[l].MovieID == rows[l - 1].MovieID
  //         ) {
  //           countPairActorsTogether++;
  //           if (countPairActorsTogether > maxCountPairActorsTogether) {
  //             maxCountPairActorsTogether = countPairActorsTogether;
  //             firstActorId = +rows[l].ActorID;
  //             secondActorId = +rows[l - 1].ActorID;
  //             moviesPlayedTogether.push(+rows[l].MovieID);
  //           }
  //         }
  //       }

  //       //console.log(
  //       //maxCountPairActorsTogether,
  //       //moviesPlayedTogether,
  //       // rows[j].ID,
  //       // rows[j].ActorID,
  //       // rows[j].MovieID,
  //       // rows[j].RoleName
  //       //);
  //     }
  //   }
  //   console.log(
  //     `max pairs actors ${maxCountPairActorsTogether}, first actor ${firstActorId}, second actor ${secondActorId}, movie prayed together ${moviesPlayedTogether}`
  //   );
  // }
  // topActorPairReverse(rows);

  return (
    <>
      <h1>Home page</h1>
      <ul>
        <div style={{ backgroundColor: "green" }}>
          Top Actor Pair
          <li>actor 1: {resRows.firstActor}</li>
          <li>actor 2: {resRows.secondActor}</li>
        </div>
        <li>
          List of movie titles: {resRows.moviesPlayedTogether1.join(", ")}
        </li>
        <li>total shared movies: {resRows.maxCountPairActorsTogether1}</li>
      </ul>
      <ul>
        {rows.map((item, index) => (
          <li key={index}>
            {item.ID} | {item.ActorID} | {item.MovieID} | {item.RoleName}
          </li>
        ))}
      </ul>
    </>
  );
}
