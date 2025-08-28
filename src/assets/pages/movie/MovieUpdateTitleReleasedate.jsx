import { useEffect, useState } from "react";
import classes from "./MovieUpdateTitleReleasedate.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MovieUpdateTitleReleasedatePage() {
  const [title, setTitle] = useState([]);
  const [date, setDate] = useState([]);

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
        <div className={classes.title}>Change Title releasedate</div>

        <label htmlFor="title">New Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label htmlFor="title">New Releasedate</label>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <button onClick={() => updateTitleReleasedate(id, newTitleAndDate)}>
          Update
        </button>
        <Link to="..">
          <button>Back</button>
        </Link>
      </div>
    </>
  );
}
