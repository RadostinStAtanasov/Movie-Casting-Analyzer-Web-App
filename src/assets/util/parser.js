import { useState } from "react";

const [csvFile, setCsvFile] = useState();
const [csvArray, setCsvArray] = useState([]);
// [{name: "", age: 0, rank: ""},{name: "", age: 0, rank: ""}]

export const processCSV = (str, delim = ",") => {
  const headers = str.slice(0, str.indexOf("\n")).split(delim);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  const newArray = rows.map((row) => {
    const values = row.split(delim);
    const eachObject = headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {});
    return eachObject;
  });

  console.log(csvArray);
  setCsvArray(newArray);
  console.log(csvArray);
};

const submit = () => {
  const file = csvFile;
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    console.log(text);
    processCSV(text);
  };

  reader.readAsText(file);
};
