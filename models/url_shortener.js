var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlModelSchema = new Schema({
    long_url: String,
    short_url: String
})

module.exports = mongoose.model('UrlModel', UrlModelSchema);