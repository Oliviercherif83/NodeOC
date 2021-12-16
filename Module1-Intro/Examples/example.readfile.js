// Chargement du module dans votre code
const fs = require('fs');

fs.readFile('/Data/titanic.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});