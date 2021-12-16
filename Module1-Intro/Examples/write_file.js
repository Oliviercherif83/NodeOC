const fs = require("fs");
const { writeFile, appendFile } = fs; // assignation par décomposition

// si on souhaite mélanger les deux syntaxes attention aux callback
// writeFile("myFile.txt", data, (err) => {
//   if (err) throw err;

//   for (const number of [...Array(100).keys()])
//     appendFile("myFile.txt", number + "\n", (err) => {
//       if (err) throw err;

//       console.log("Success");
//     });
// });

for (const number of [...Array(100).keys()])
  appendFile("myFile.txt", number + "\n", (err) => {
    if (err) throw err;

    console.log("Success");
  });