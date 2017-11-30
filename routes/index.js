var express = require('express');
var router = express.Router();
var UrlModel = require('../models/url_shortener');
var validUrl = require('valid-url');
var shortid = require('shortid');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/new/:url(*)", function(req, res, next){
    var newLink = req.params.url
    if(validUrl.isUri(newLink)){
       UrlModel.find({long_url: newLink}, function(err, link){
        if (err){
            res.json('Error: There has been an issue accessing the database')
        }
        if(link.length){
            res.json(link) 
       } else {
            var id = shortid.generate();
            var shorturl = `http://${req.hostname}/${id}`
            UrlModel.create({long_url: newLink, short_url: shorturl}, function(err, instance){
                if(err) {
                    res.json('Error: We could not process your request')
                }else {
                    res.json(instance)
                }
            })
       }
    })
    } else {
        res.json('Error: This is not a valid link')
    }
})
router.get('/:ENCODED_URL', function(req, res, next){
    UrlModel.findOne({
        short_url: `http://${req.hostname}/${req.params.ENCODED_URL}`
    },function(err, found){
        if(err){
            res.json('Error: We could not redirect you to the original link')
        }
        if(found){
           res.redirect(found.long_url)
        }
    })
        
 
})

module.exports = router;
