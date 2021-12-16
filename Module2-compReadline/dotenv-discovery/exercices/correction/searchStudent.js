const readline = require("readline");
// une première clé qui est utils de votre exports puis on récupère la variable sanitize de l'objet utils, assignation par décomposition (voir documentation)
const { utils : { sanitize } } = require("./utils");

const students = ["Alan", "Sonia", "Sophie"];

// CONSOLE
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Au départ on affiche un prompt avant de traiter les données avec la méthode on
rl.setPrompt("OHAI> ");
rl.prompt();

rl.on("line", (line) => {
  const student = sanitize(line);

  if (students.includes(student)) {
    console.log(
      `Vous avez trouvé un étudiant qui se trouve dans liste \n ${line.trim()}`
    );
    rl.close();

    return;
  }

  console.log(`C'est raté ! Essayez encore`);
  rl.prompt();
}).on("close", () => {
  process.exit(0);
});