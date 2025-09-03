import { IMAGES_ACTORS } from "../../util/generateImages";
import newActorImage from "../../images/newActorImage.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Actor.module.css";

export default function ListOfActors(props) {
  const [rows, setRows] = useState([]);
  const [images, setImages] = useState([...IMAGES_ACTORS]);

  useEffect(() => {
    fetch("http://localhost:3000/actors")
      .then((response) => response.json())
      .then((response) => {
        setRows(response);
      })
      .catch((error) => console.log(error));
  }, []);

  let filteredData = rows.filter((el) => {
    if (props.input === "") {
      return el;
    } else {
      return el.FullName.toLowerCase().includes(props.input);
    }
  });

  return (
    <>
      <ul>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <li key={index}>
              <div className={classes.images}>
                <Link to={`/actors/${item.ID}`}>
                  {filteredData.length <= rows.length ? (
                    item.ID < rows.length - 1 ? (
                      <img src={images[item.ID].image} alt="theRock" />
                    ) : (
                      <img src={newActorImage} />
                    )
                  ) : item.ID >= filteredData.length - 1 ? (
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
    </>
  );
}
