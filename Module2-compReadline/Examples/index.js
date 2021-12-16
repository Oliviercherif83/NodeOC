const utils = require('./utils');
const { Car } = require('./car') ;
const { Product, upper } = utils.Utils;

console.info(utils);

console.info(Car);

const product = new Product("Apple", 10);

console.log(product);