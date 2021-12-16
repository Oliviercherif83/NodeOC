// ce qui rentre depuis la console en data dans le script chunk tout ce que l'on tape dans la console

process.stdin.on('data', (chunk) => {            
    const text = chunk.toString().replace("\n", "")
// on affiche ce qui est lu depuis la console
    console.log(text)
// Un algorithme pour faire quelque chose en fonction de ce que l'on va lire
    console.log(text.trim() == 'j')

    // on ajoute le .trim uniquement pour les windows
    if(text.trim() == 'j') process.exit(0);
    
    //process.exit(0);
    // process.stdout.write(text.toLocaleUpperCase()); 
  });
// faire rentrer de la données.
/*
process.stdin.on('data', (chunk) => {
    processus.exit(0); // arrêt du processus la valeur 0 est une convetion
});
*/