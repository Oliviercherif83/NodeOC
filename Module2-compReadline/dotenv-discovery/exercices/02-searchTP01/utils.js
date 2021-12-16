exports.utils = {
    avg: function (numbers, precision = 100) {
      if (numbers.length == 0) return;
  
      const sum = numbers.reduce((acc, curr) => acc + curr);
  
      return Math.floor((sum / numbers.length) * precision) / precision;
    },
  
    searchName: function (name, students) {
      for (const student of students) {
        if (name.toUpperCase() == student.name.toUpperCase()) {
          return student;
        }
  
        return false;
      }
    },
  };