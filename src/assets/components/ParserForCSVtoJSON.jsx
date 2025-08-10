import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function ParserForCSVtoJSON({ data }) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch(data);
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      console.log(rows);
      setRows(rows);
      return rows;
    }
    getData();
    <HomePage data={rows} />;
  }, []); // [] means just do this once, after initial render
  return (
    <div className="Archive">
      <table className="ArchiveTable">
        <thead>
          <tr className="ArchiveTable">
            <th>Name</th>
            <th>Address</th>
            <th>Postcode</th>
          </tr>
        </thead>
        <tbody className="ArchiveTable">
          {rows &&
            rows.map((parsedData, index) => (
              <tr key={index} className="ArchiveTable">
                <td>{parsedData.ID}</td>
                <td>{parsedData.FullName}</td>
                <td>{parsedData.BirthDate}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
