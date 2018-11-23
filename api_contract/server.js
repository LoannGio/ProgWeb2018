const express = require('express');
const dbUtils = require('../models/contract.js');
const app = express();
const port = 5000;

app.get('/contracts/', function (req, res){
  /*let filters = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    lowestCost: req.body.lowestCost,
    highestCost: req.body.highestCost
  }*/
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let lowestPrice = req.body.lowestPrice;
  let highestPrice = req.body.highestPrice;

  let contractList = await dbUtils.getContracts(startDate, endDate, lowestPrice, highestPrice);
  res.send(contractList);
});

app.listen(port, function(){
  console.log('Listening on port '+ port);
});
