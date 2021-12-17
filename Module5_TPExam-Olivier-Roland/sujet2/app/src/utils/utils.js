const {
    utils: { addition, soustraction, multiplication },
  } = require("./calculate");
  
  exports.utils = {
    conditionnal: function (sanitize, results) {
      const { operator } = sanitize[2];
      if (operator === "plus") {
        const result = addition(
          parseInt(sanitize[0].number1),
          parseInt(sanitize[1].number2)
        );
  
        results.push({
          ...sanitize[0],
          ...sanitize[1],
          ...sanitize[2],
          ...(sanitize[3] = { result: result }),
        });
      }
  
      if (operator === "less") {
        const result = soustraction(
          parseInt(sanitize[0].number1),
          parseInt(sanitize[1].number2)
        );
  
        results.push({
          ...sanitize[0],
          ...sanitize[1],
          ...sanitize[2],
          ...(sanitize[3] = { result: result }),
        });
      }
      if (operator === "multiply") {
        const result = multiplication(
          parseInt(sanitize[0].number1),
          parseInt(sanitize[1].number2)
        );
  
        results.push({
          ...sanitize[0],
          ...sanitize[1],
          ...sanitize[2],
          ...(sanitize[3] = { result: result }),
        });
      }
    },
  };