const {priceTTC} = require('./utils');
require('dotenv').config()

// import 

const prices = [
    { name : "Apple", priceHT : 1.0, priceTTC : null },
    { name : "Orange", priceHT : 1.2, priceTTC : null },
    { name : "Rasberry", priceHT : 2.5, priceTTC : null },
];

// Modifiez le tableau pour mettre les prix TTC
// 1ere manière
//prices.map(p=>({...p,priceTTC = priceTTC(p.priceHT,0.2)}));

//2ème manière
for(const p of prices){
    p.priceTTC = priceTTC(p.priceHT,0.2);
}
console.table(prices)