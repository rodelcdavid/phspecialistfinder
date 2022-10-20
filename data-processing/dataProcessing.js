var pdf2table = require("pdf2table");
var fs = require("fs");

fs.readFile("./Philhealth.pdf", function (err, buffer) {
  console.time();
  if (err) return console.log(err);

  pdf2table.parse(buffer, function (err, rows) {
    if (err) return console.log(err);

    //only length 7 or 8
    const filteredRow = rows.filter(
      (row) => row.length >= 6 && row[0] !== "LAST_NAME"
    );

    const fixSpace = (rows) => {
      rows.forEach((row) => {
        if (
          row[row.length - 1] === "METRO   MANILA" ||
          row[row.length - 1] === "METRO  MANILA"
        ) {
          row[row.length - 1] = "METRO MANILA";
        }
      });
      return rows;
    };

    const fixedSpaceRows = fixSpace(filteredRow);

    console.log(fixedSpaceRows[6447]);

    const finalData = fixedSpaceRows.map((row) => {
      if (row.length === 8) {
        //have long element
        //find the long element
        let longElement;
        row.forEach((item, index) => {
          if (
            (item[item.length - 1] === " " || item[item.length - 1] === "-") &&
            item.length > 9
          ) {
            longElement = index;
          }
        });

        switch (longElement) {
          case 1: //long last name
            return [
              row[0], //number
              row[1] + row[2], //ln
              row[3], //fn
              row[4], //mn
              row[5], //specialty
              row[6], //municipality
              row[7], //province
            ];

          case 2: //long first name
            return [
              row[0], //number
              row[1], //ln
              row[2] + row[3], //fn
              row[4], //mn
              row[5], //specialty
              row[6], //municipality
              row[7], //province
            ];

          case 3: //long middle name
            return [
              row[0], //number
              row[1], //ln
              row[2], //fn
              row[3] + row[4], //mn
              row[5], //specialty
              row[6], //municipality
              row[7], //province
            ];
          case 4: //long specialty
            return [
              row[0], //number
              row[1], //fn
              row[2], //mn
              row[3], //ln
              row[4] + row[5], //specialty
              row[6], //municipality
              row[7], //province
            ];

          case 5: //long municipality
            return [
              row[0], //number
              row[1], //fn
              row[2], //mn
              row[3], //ln
              row[4], //specialty
              row[5] + row[6], //municipality
              row[7], //province
            ];
          default:
            return;
        }
      } else if (row.length === 7) {
        //normal
        return row;
      } else if (row.length === 6) {
        //no middle name
        return [
          row[0], //number
          row[1], //fn
          "-", //mn
          row[2], //ln
          row[3], //specialty
          row[4], //municipality
          row[5], //province
        ];
      }
    });

    let locations = [];
    let specialties = [];
    finalData.forEach((arr) => {
      const currentSpecialty = arr[4];
      const currentLocation = [arr[6], arr[5]];
      const isDuplicate = locations.some((a) =>
        currentLocation.every((v, i) => v === a[i])
      );

      //check duplicate location
      if (!isDuplicate) {
        locations.push(currentLocation);
      }

      //check duplicate specialty

      if (!specialties.includes(currentSpecialty)) {
        specialties.push(currentSpecialty);
      }
    });

    locations = locations.sort();
    specialties = specialties.sort();

    const filters = {
      locations,
      specialties,
    };

    fs.writeFile(
      "data.js",
      `export const data = ${JSON.stringify(finalData)};`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    fs.writeFile(
      "filters.js",
      `export const filters = ${JSON.stringify(filters)};`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});
