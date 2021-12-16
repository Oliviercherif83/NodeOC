let count = 0;

const min = 1;
const max = 100;
const numberSearch = Math.floor(Math.random() * 100) + 1;
const attempt = 5;

console.log(`
Vous devez commencer le jeu en choisissant un nombre compris entre ${min} et ${max}, en fait le nombre c'est : ${numberSearch}
`);

process.stdin.on("data", (chunk) => {
  const number = parseInt(chunk);

  if (number == "" || isNaN(number) == true) {
    console.log(`Ce n'est pas un nombre`);
  }

  if (count > attempt) {
    console.log(`Vous avez fait ${count} tentatives, c'est terminé`);

    // process avec exit 0 par convention
    process.exit(0);
  }

  // à chaque qu'il fait un choix on incrémente de + 1
  count++;
  if (number > numberSearch) {
    console.log(`Le nombre est plus petit que ${number}`);

  } else if (number < numberSearch) {
    console.log(`Le nombre est plus grand que ${number}`);

  } else {
    console.log(
      `BRAVO vous avez deviné c'était bien le nombre ${numberSearch}, vous avez deviné en ${count} !!`
    );

    // process avec exit 0 par convention
    process.exit(0);
  }
});