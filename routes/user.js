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
        res.status(401).send("Invalid MLH Token (You may need re-login)").end();
      } else {
        body = JSON.parse(body);
        models["Users"].findById(body.data.id).then(function(user) {
          if(!user) {
            models["Users"].create(req.body.data)
              .then(function(results) {
                res.status(201).end();
              });
          } else {
            res.status(401).send("Already registered").end();
          }
        });
      }
    });
});

router.put('/updatestatus', function(req, res, next) {
  if(!req.body.how) {
    req.body.how = "";
  }
  request.get('https://my.mlh.io/api/v2/user.json?access_token=' + req.body.token,
    function(err, response, body) {
      console.log(req.body.token);
      if (err || response.statusCode !== 200) {
        res.status(401).send("Invalid MLH Token (You may need re-login)").end();
      } else {
        body = JSON.parse(body);

        if(req.body.data.accept) {
          req.body.data.status = "able";
        } else {
          req.body.data.status = "unable";
        }
        models["Users"].update(
          {status: req.body.data.status, how: req.body.data.how},
          {where: {id: body.data.id}}
        ).then(function(result) {
          res.status(201).end();
        }).catch(function(err) {
          res.status(401).send("Invalid").end();
        })
      }
    }
  );
});

module.exports = router;
