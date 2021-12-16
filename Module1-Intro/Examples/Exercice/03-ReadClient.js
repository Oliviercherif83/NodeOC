const fs = require('fs');
const {writefile, appendFile} = fs;

fs.readFile('./Data/students.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const lines = data.split(/\r?\n/).filter(d => d != '').slice(1);
    
    
// on parc
    for(const line of lines){
       const [notes, name, address] = line.split(' ');
        if(notes > 17){
            console.log(name)
        }
    }  
    // récupérer la note maximale

    console.log(Math.max(students.map (student => student.note)));
  });
