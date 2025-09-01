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
              {item.ID}|{index}
              <Link to={`/movies/${item.ID}`}>
                {item.ID > index ? (
                  <img src={images[index].image} alt="theRock" />
                ) : (
                  <img src={newMovieImage} />
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
