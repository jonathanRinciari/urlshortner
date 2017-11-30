var express = require('express');
var router = express.Router();
var newLink = require('../controllers/newLink.js')
var redirect_controller = require('../controllers/redirect_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Url Shortener' });
});

router.get("/new/:url(*)", newLink)
router.get('/:ENCODED_URL', redirect_controller)

module.exports = router;
