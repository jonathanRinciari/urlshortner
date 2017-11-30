var express = require('express');
var UrlModel = require('../models/url_shortener');
var validUrl = require('valid-url');
var shortid = require('shortid');


module.exports = function(req, res, next){
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
}