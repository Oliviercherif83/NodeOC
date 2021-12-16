exports.tabsShuffles = function (array) {
    let i = array.length, rand;
  
    while (i != 0) {
      rand = Math.floor(Math.random() * i);
      i--;
  
      [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
  }
  

