var express = require('express');
var router = express.Router();
var UrlModel = require('../models/url_shortener');
var validUrl = require('valid-url');
var urlShortener = require('../public/javascripts/urlshortener')
var shortid = require('shortid');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/new/:url(*)", function(req, res){
    var newLink = req.params.url
    if(validUrl.isUri(newLink)){
       UrlModel.find({long_url: newLink}, function(err, docs){
        if (err) throw err
        if(docs.length){
            res.json(docs) 
       } else {
            var id = shortid.generate();
            var shorturl = `http://www.${req.hostname}/${id}`
            UrlModel.create({long_url: newLink, short_url: shorturl}, function(err, instance){
                if(err) throw err;
                else {
                    res.json(instance)
                }
            })
       }
    })
    } else {
        console.log('not valid link')
    }
})
router.get('/:ENCODED_URL', function(req, res, next){
    res.send('Alternative Link')
})

    //   var obj = urlShortener(newLink, req.hostname)
module.exports = router;
