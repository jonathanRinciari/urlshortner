var express = require('express');
var UrlModel = require('../models/url_shortener');


module.exports = function (req, res, next){
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
        
 
}