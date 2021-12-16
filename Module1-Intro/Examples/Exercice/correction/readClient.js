const { readFileSync, appendFile, writeFileSync } = require("fs");

const urlFileStudents = __dirname + "/../Data/students.txt";

// on doit lui préciser l'encodage pour travailler sur les données du fichier dans le script, sinon il retourne un buffer (données sont encodées en binaire)
const data = readFileSync(urlFileStudents, "utf-8");

// filter permet de retirer la dernière vide si présente dans votre fichier
const students = data
  .split(/\r?\n/)
  .slice(1)
  .filter((s) => s != "")
  .map((s) => {
    const [note, name, address] = s.split(" ");

    // parenthèses forcent le retour des valeurs sur plusieurs lignes
    return {
      note,
      name,
      address,
    };
  });

// 1 Lecture et formatage des données du fichier
console.log(students);

// 2 Etudiants qui ont eu plus de 17, la constante bloque la ré-assignation
const studentsMore17 = students.filter((student) => student.note > 17);

console.log(studentsMore17);

// 3 Le/les meilleur(s) étudiant(s)
console.log(students.map((student) => student.note));

// le spread permet de passer des paramètres à une fonction, ici on passe les paramètres à la fonction Max
console.log(Math.max(...[19, 12, 20]));

// Attention Math.max travaille également sur des valeurs qui sont typées faiblement Math.max( ...['11', '12', 0 ]) => 12
const bestNote = Math.max(...students.map((student) => student.note));
const bestStudents = students.filter((student) => student.note == bestNote);
console.log(bestStudents);

// 5. Ordonnez en fonction des notes

const studentsOrderByNote = students.sort((s1, s2) => s1.note - s2.note);
console.log(studentsOrderByNote);
/*
// Ordonne par rapport aux caractères par défaut, cependant si vous mettez une fonction précisant un calcul numérique il ordonnera en fonction des nombres
console.log( [1, 30, 4, 21, 100000].sort( (a,b) => a - b) );
*/

// 6 ajoutez dans le tableau les étudiants suivants

const newStudents = [
  {
    note: 18,
    name: "Sonia",
    address: "Paris",
  },
  {
    note: 17,
    name: "Clarisse",
    address: "Marseille",
  },
];

const urlNewFileStudents = __dirname + "/../Data/new_students.txt";

for(const s of newStudents){
    const line = `${s.note} ${s.name} ${s.address}`;
    appendFile(urlNewFileStudents,line + "\r\n", (err) => {

        if(err) {throw err; return; }
        console.log("success");
    } )
}

const formatData = students.map( s => (`${s.note} ${s.name.toUpperCase()} ${s.address}`) );
const head = "Notes Name address \n";
// join permet de transformer un tableau en chaîne de caractères
writeFileSync( urlNewFileStudents , head + formatData.join("\n") )