import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Actor.module.css";
import ListOfActors from "./ListOfActors";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ActorPage() {
  const [rows, setRows] = useState([]);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/actors")
      .then((response) => response.json())
      .then((response) => {
        setRows(response);
      })
      .catch((error) => console.log(error));
  }, []);

  function inputHandler(e) {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }

  const addActor = () => {
    if (fullName == "" || birthDate == "") {
      return;
    }
    const id = rows.length + 1;
    const actor = { ID: id, FullName: fullName, BirthDate: birthDate };
    fetch("http://localhost:3000/actors", {
      method: "POST",
      body: JSON.stringify(actor),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="app">
      <h1>All Actors</h1>
      <TextField
        onChange={inputHandler}
        id="outlined-basic"
        variant="outlined"
        label="Search"
      />
      <div className={classes.inputForm}>
        <TextField
          id="outlined-basic"
          label="FullName"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="BirthDate"
            value={birthDate}
            onChange={(newValue) => setBirthDate(newValue)}
          />
        </LocalizationProvider>
        <br />
        <Link to="..">
          <button type="submit" className={classes.btn} onClick={addActor}>
            Add Actor
          </button>
        </Link>
      </div>

      <ListOfActors input={inputText} />
    </div>
  );
}
