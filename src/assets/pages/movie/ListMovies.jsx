import { IMAGES_MOVIES } from "../../util/generateImages";
import newMovieImage from "../../images/mewMovieImage.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Movie.module.css";

export default function ListMovies(props) {
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([...IMAGES_MOVIES]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((response) => {
        setMovies(response);
      })
      .catch((err) => console.log(err));
  }, []);

  let filteredData = movies.filter((el) => {
    if (props.input === "") {
      return el;
    } else {
      return el.Title.toLowerCase().includes(props.input);
    }
  });

  return (
    <>
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>
            <div className={classes.images}>
              <p style={{ color: "black" }}>
                {"itemID - " + item.ID}|{"index - " + index + 1}|
                {filteredData.length}
              </p>
              <Link to={`/movies/${item.ID}`}>
                {item.ID >= filteredData.length - 1 ? (
                  <img src={newMovieImage} />
                ) : (
                  <img src={images[index].image} alt="theRock" />
                )}
                {item.Title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
