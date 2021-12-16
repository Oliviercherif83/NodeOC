const fs = require("fs");
const readline = require("readline");
const { utils: { avg, searchName} } = require('./utils');

// On a un objet JS à partir des données texte JSON du fichier 
const json = JSON.parse( fs.readFileSync("./Data/students.json") );

const { students } = json;

const studentsAvg = students.map( student => {
    student.avg = avg(student.notes);

    return student;
});

// console.log(studentsAvg)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.setPrompt("OHAI> ");
  rl.prompt();
  
  rl.on("line", (line) => {
    const name = line.trim();

    if(name === 'stop'){
        rl.close();
        return;
    }

    if( student_avg = searchName(name, studentsAvg) ){
        // console.log(student_avg);
        console.log(`La moyenne de ${name} est ${student_avg.avg} !`)
        rl.prompt();

        return;
    }

    console.log(`L'étudiant ${name} n'existe pas dans la base de données`);
   
    rl.prompt();
  }).on("close", () => {
    console.log("Have a great day!");
    process.exit(0); // arrêt du processus
  });