var express = require('express');
var models = require('../models');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.put('/create', function(req, res, next) {
  console.log(req.body);
  request.get('https://my.mlh.io/api/v2/user.json?access_token=' + req.body.token,
    function(err, response, body) {
      if (err || response.statusCode !== 200) {
        console.log(response +'\n' + err);
        console.log('Error:' + err + "\n" + JSON.stringify(response));
        res.status(302).send(response).end();
      } else {
        body = JSON.parse(body);
        models["Users"].findById(body.data.id).then(function(user) {
          if(!user) {
            models["Users"].create(req.body.data)
              .then(function(results) {
                res.status(201).end();
              });
          } else {
            res.status(302).send("Already registered");
          }
        });
      }
    });
});

module.exports = router;
