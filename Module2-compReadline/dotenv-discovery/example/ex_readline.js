const readline = require("readline");

// Création de l'interface de gestion des entrées et sorties, basée sur input et ouput de la console

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

rl.question("How do you like node ?", answer => {
    console.log(` Your answer ${answer} `);

    // la méthode close permet d'arrêter le processus d'écoute 
    rl.close();
});