var express = require('express');
var router = express.Router();
var React = require('react');
let sampleComponent = require('../src/SampleReact');
var ReactComponent = React.createFactory(sampleComponent);


/* GET home page. */
router.get('/', function(req, res, next) {
  let reactComponentMarkup = ReactComponent();
  let staticMarkup = React.renderToString(reactComponentMarkup);
  res.render('index', { title: 'SingleApp', sampleComponent: staticMarkup });
});

module.exports = router;
