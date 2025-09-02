import { useEffect, useState } from "react";
import classes from "./MovieUpdateTitleReleasedate.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function MovieUpdateTitleReleasedatePage() {
  const [title, setTitle] = useState([]);
  const [date, setDate] = useState();

  const params = useParams();
  const id = params.movieId;

  const newTitleAndDate = {
    newTitle: title,
    newDate: date,
  };

  function updateTitleReleasedate(id, newTitleAndDate) {
    if (newTitleAndDate.newTitle == "" || newTitleAndDate.newDate == "") {
      return;
    }

    fetch(
      "http://localhost:3000/movies/update/updatetitleAndReleasedate/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTitleAndDate),
      }
    )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className={classes.updateTitleReleasedate}>
        <div className={classes.title}>Change Title and Releasedate</div>

        <TextField
          label="New Title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="New Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>

        <Link to="/movies" relative="path">
          <Button
            variant="contained"
            onClick={() => updateTitleReleasedate(id, newTitleAndDate)}
          >
            Update
          </Button>
        </Link>

        <Link to=".." relative="path">
          <Button variant="contained">Back</Button>
        </Link>
      </div>
    </>
  );
}
