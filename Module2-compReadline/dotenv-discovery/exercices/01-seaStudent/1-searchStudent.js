const readline = require("readline");
const students = ["Alan", "Sonia", "Sophie"];
// Création de l'interface de gestion des entrées et sorties, basée sur input et ouput de la console

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Message dans la console
rl.setPrompt("Rentrer un étudiant> ");

// définit l'invite de commande
rl.prompt();

rl.on("line", (line) => {
  switch (line.trim()) {
    case "Alan":
      console.log("l'étudiant` " + line.trim() + "` est présent");
      process.exit(0);
    case "Sonia":
      console.log("l'étudiant` " + line.trim() + "` est présent");
      process.exit(0);
    case "Sophie":
      console.log("l'étudiant` " + line.trim() + "` est présent");
      process.exit(0);
    default:
      console.log(
        "nous n'avons pas pu trouver votre étudiant`" + line.trim() + "`"
      );
      process.exit(0);
  }
})
