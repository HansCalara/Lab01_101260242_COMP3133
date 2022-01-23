const csv = require("csv-parser");
const fs = require("fs");
let dataCanada = [];
let dataUSA = [];

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const textCanada = createCsvWriter({
  path: "canada.txt",
  header: [
    { id: "country", title: "country" },
    { id: "year", title: "year" },
    { id: "population", title: "population" },
  ],
});
const textUSA = createCsvWriter({
  path: "usa.txt",
  header: [
    { id: "country", title: "country" },
    { id: "year", title: "year" },
    { id: "population", title: "population" },
  ],
});

fs.createReadStream("input_countries.csv")
  .pipe(csv())
  .on("data", (row) => {
    if (row.country == "Canada") {
      dataCanada.push(row);
      textCanada.writeRecords(dataCanada);
    } else if (row.country == "United States") {
      dataUSA.push(row);
      textUSA.writeRecords(dataUSA);
    }
  })
  .on("end", () => console.log("parsing complete"));
