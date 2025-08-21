// import Papa from "papaparse";
// import * as fs from "fs";

// let arr = [
//   { ID: "6", FullName: "Actor 6 Lastname", BirthDate: "1966-01-11" },
//   { ID: "7", FullName: "Actor 7 Lastname", BirthDate: "1992-02-15" },
//   { ID: "8", FullName: "Actor 8 Lastname", BirthDate: "1971-06-01" },
//   { ID: "9", FullName: "Actor 9 Lastname", BirthDate: "1985-06-09" },
//   { ID: "10", FullName: "Actor 10 Lastname", BirthDate: "1988-10-12" },
//   { ID: "11", FullName: "Actor 11 Lastname", BirthDate: "1998-11-28" },
//   { ID: "12", FullName: "Actor 11 Lastname", BirthDate: "1998-11-28" },
//   { ID: "13", FullName: "Actor 11 Lastname", BirthDate: "1998-11-28" },
//   { ID: "14", FullName: "Actor 11 Lastname", BirthDate: "1998-11-28" },
//   { ID: "15", FullName: "Actor 11 Lastname", BirthDate: "1998-11-28" },
// ];

// export async function writeFileExample() {
//   try {
//     // Write text to a file
//     fs.writeFile(
//       "arr.csv",
//       Papa.unparse(arr, { header: true, delimiter: "," })
//     );

//     // Write JSON data
//     const data = { name: "John", age: 30, city: "New York" };
//     fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf8");

//     console.log("Files created successfully");
//   } catch (err) {
//     console.error("Error writing files:", err);
//   }
// }

// writeFileExample();

// console.log("gotovooo");
