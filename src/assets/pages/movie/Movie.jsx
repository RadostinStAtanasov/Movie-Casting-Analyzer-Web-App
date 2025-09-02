import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Movie.module.css";
import TextField from "@mui/material/TextField";
import ListMovies from "./ListMovies";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button } from "@mui/material";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState([]);
  const [releaseDate, setReleaseDate] = useState();
  const [inputText, setInputText] = useState("");

  function inputHandler(e) {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((response) => {
        setMovies(response);
      })
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <div className="app">
      <h1>All Movies</h1>

      <div className={classes.inputs}>
        <div className={classes.inputForm}>
          <p>Add Movie</p>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Release Date"
              value={releaseDate}
              onChange={(newValue) => setReleaseDate(newValue)}
            />
          </LocalizationProvider>

          <br />
          <Link to="..">
            <Button type="submit" variant="text" onClick={addAcMovie}>
              Add Movie
            </Button>
          </Link>
        </div>
        <div className="main">
          <div className="search">
            <TextField
              onChange={inputHandler}
              id="outlined-basic"
              variant="outlined"
              label="Search"
            />
          </div>
        </div>
      </div>
      <ListMovies input={inputText} />
    </div>
  );
}
