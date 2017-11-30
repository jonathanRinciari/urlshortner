var UrlModel = require('../../models/url_shortener')
var shortid = require('shortid')

module.exports = function urlChecker(link, host){
    UrlModel.find({long_url: link}, function(err, docs){
        if (err) throw err
        if(docs.length){
           return docs
        } else {
            var id = shortid.generate();
            var shorturl = `http://www.${host}/${id}`
            UrlModel.create({long_url: link, short_url: shorturl}, function(err, instance){
                if(err) throw err;
                else {
                    console.log(instance)
                }
            })
        }
    })
}
