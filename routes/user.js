var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET users listing. */
router.put('/create', function(req, res, next) {
  console.log(req.body.resume)
  models["Users"].create(req.body)
    .then(function(results) {
      res.status(201).end();
    });
});

module.exports = router;
