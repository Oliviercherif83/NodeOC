const fs = require('fs');

fs.readFile('./Data/titanic.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const lines = data.split(/\r?\n/).filter(d => d != '').slice(1);
    console.log(lines);
    
    let survived = 0;

    for(const line of lines){
        /*
        if ( line.split(',')[1] == 1) {
            survived++;
        }*/

         // 2) combien de femmes ont survécu
        if (line.split(',')[5] == "female" && line.split(',')[1] == 1){
            survived++;
        }// 233 femmes ont survécu
        
    }

   
    console.log(survived);    
  });



