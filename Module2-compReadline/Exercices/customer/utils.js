exports.priceTTC = function( price, tva){

  return price * (1 + tva);
}
