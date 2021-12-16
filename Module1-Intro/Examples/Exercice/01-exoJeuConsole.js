// un compteur
let i = 0;
const min = 1;
const max = 100;
const attempt = 10;
// const number = Math.floor(Math.random() * 100) + 1;
// génère un nombre aléatoire
const numberSearch = Math.floor(Math.random() * 100) + 1;

// récupère le flux et le converti en chaine de caractères, la méthode replace permet de supprimer le saut de ligne
console.log(`
        Vous devez commencer le jeu en choisissant un nombre compris entre ${min} et ${max}, en fait le nombre c'est : ${numberSearch}
    `);
process.stdin.on("data", (chunk) => {
  // convertir en nombre notre chunk
  const number = parseInt(chunk);

  if (number == "" || sNaN(number) == true) {
    console.log("Ce n'est pas un nombre");
  }

  if (count > attempt) {
    console.log(`Vous avez fait ${count} tentatives, c'est terminé`);
    processus.exit(0); // arrêt du processus la valeur 0 est une convention
  }
  count ++;

  if (number > numberSearch) {
    console.log(`le nombre est plus petit que ${number}`);
  } else if (number < numberSearch) {
    console.log(`le nombre est plus grand que ${number}`);
  } else {
    `BRAVO vous avez deviné c'était bien le nombre ${numberSearch}, vous avez deviné en ${count}`;
  }
});
