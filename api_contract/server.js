const express = require('express');
const dbUtils = require('./models/contract.js');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/contracts', async function (req, res){
  console.log(req.body);
  let startDate = Date.parse(req.body.startDate);
  let endDate = Date.parse(req.body.endDate);
  let lowestPrice = req.body.lowestPrice;
  let highestPrice = req.body.highestPrice;

  let contractList = await dbUtils.getContracts(startDate, endDate, lowestPrice, highestPrice);
  console.log(contractList);
  res.send(contractList);
});

app.listen(port, function(){
  console.log('Listening on port '+ port);
});
