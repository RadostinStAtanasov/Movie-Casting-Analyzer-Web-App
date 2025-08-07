import { useState } from "react";

export default function CsvDateParser() {
  const [data, setData] = useState([]);

  // Common date formats to try parsing
  const parseDate = (dateStr) => {
    // Remove quotes if present
    dateStr = dateStr.replace(/^"|"$/g, "").trim();

    // Try parsing common date formats
    const formats = [
      { regex: /^\d{4}-\d{2}-\d{2}$/, parse: (str) => new Date(str) }, // YYYY-MM-DD
      {
        regex: /^\d{2}\/\d{2}\/\d{4}$/,
        parse: (str) => {
          const [month, day, year] = str.split("/").map(Number);
          return new Date(year, month - 1, day);
        },
      }, // MM/DD/YYYY
      {
        regex: /^\d{2}-\d{2}-\d{4}$/,
        parse: (str) => {
          const [day, month, year] = str.split("-").map(Number);
          return new Date(year, month - 1, day);
        },
      }, // DD-MM-YYYY
    ];

    for (const format of formats) {
      if (format.regex.test(dateStr)) {
        const parsed = format.parse(dateStr);
        if (!isNaN(parsed)) {
          // Format as DD-MM-YYYY for display
          return parsed.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }
      }
    }

    // Return original string if not a valid date
    return dateStr;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n").map((row) => row.trim());

      // Parse CSV
      const parsedData = rows.map((row) => {
        const columns = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === "," && !inQuotes) {
            columns.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        columns.push(current.trim());
        return columns;
      });

      // Filter out empty rows
      const filteredData = parsedData.filter((row) =>
        row.some((cell) => cell !== "")
      );

      // Identify date columns (based on header or format)
      const headers = filteredData[0] || [];
      const dateColumnIndices = headers
        .map((header, index) =>
          header.toLowerCase().includes("date") ||
          header.toLowerCase().includes("birth")
            ? index
            : -1
        )
        .filter((index) => index !== -1);

      // Parse dates in identified columns
      const processedData = filteredData.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === 0 || !dateColumnIndices.includes(colIndex)) {
            return cell; // Keep headers and non-date cells unchanged
          }
          return parseDate(cell); // Parse date for data rows in date columns
        })
      );

      setData(processedData);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h2>Upload CSV File with Dates</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data.length > 0 && (
        <table style={{ borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              {data[0].map((header, index) => (
                <th
                  key={index}
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
