import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Movie.module.css";
import { IMAGES_MOVIES } from "../../util/generateImages";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState([]);
  const [releaseDate, setReleaseDate] = useState([]);
  const [images, setImages] = useState([...IMAGES_MOVIES]);

  const addAcMovie = () => {
    if (title == "" || releaseDate == "") {
      return;
    }
    const id = movies.length + 1;
    const movie = { ID: id, Title: title, ReleaseDate: releaseDate };
    fetch("http://localhost:3000/movies", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((response) => {
        setMovies(response);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(movies);

  return (
    <div className="app">
      <h1>All Movies</h1>

      <div className={classes.inputForm}>
        <label htmlFor="">Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="">ReleaseDate: </label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <br />
        <button type="submit" className={classes.btn} onClick={addAcMovie}>
          Add Movie
        </button>
      </div>

      <ul>
        {movies.map((item, index) => (
          <li key={index}>
            <div className={classes.images}>
              <Link to={`/movies/${item.ID}`}>
                <img
                  src={
                    index < images.length
                      ? images[index].image
                      : images[index - index].image
                  }
                  alt="theRock"
                />
                {item.Title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
