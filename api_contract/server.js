const express = require('express');
const dbUtils = require('./models/contract.js');
const app = express();
const port = 5000;

app.get('/contracts/', async function (req, res){
  let startDate = Date.parse(req.body.startDate);
  let endDate = Date.parse(req.body.endDate);
  let lowestPrice = req.body.lowestPrice;
  let highestPrice = req.body.highestPrice;

  let contractList = await dbUtils.getContracts(startDate, endDate, lowestPrice, highestPrice);
  res.send(contractList);
});

app.listen(port, function(){
  console.log('Listening on port '+ port);
});
