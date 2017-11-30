var express = require('express');
var router = express.Router();
var UrlModel = require('../models/url_shortener');
var validUrl = require(valid-url)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/new/:url(*)", function(req, res){
    var newLink = req.params.url
})
router.get('/:ENCODED_URL', function(req, res, next){
    res.send('Alternative Link')
})

module.exports = router;
