var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/new', function(req, res, next) {
  var User = require('../models/users');
  var instance = new User({first_name: 'John', last_name: 'Bucknam'});
  console.log(instance);
  instance.save(function(err, res) {
    if(err) {
      res.render('error', {title:'Error', message: err});
      throw err;
    } else {
      console.log(res);
    }
  });
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  var User = require('../models/users');
  User.find({first_name: 'John'}, function(err, res) {
    if(err) {
      throw err;
    } else {
      console.log(res);
    }
  });
  res.send('respond with a resource');
});

module.exports = router;
