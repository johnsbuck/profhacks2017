var express = require('express');
var request = require('request');
var url     = require('url');
var router  = express.Router();

router.get('/auth', function(req, res, next) {
  /*res.redirect("https://my.mlh.io/oauth/authorize?client_id=fc30a89abaa8a953a070443edcb5317c3d7d27c0866104a60420e687f4f75cce" +
    "&redirect_uri=http://localhost:3000/mlh/token&response_type=code&scope=email+education+birthday");*/
  res.redirect("https://my.mlh.io/oauth/authorize?client_id=fc30a89abaa8a953a070443edcb5317c3d7d27c0866104a60420e687f4f75cce" +
    "&redirect_uri=http://localhost:3000/form.html&response_type=token&scope=email+education+birthday");
  res.end();
});

/* GET users listing. */
router.get('/token', function(req, res, next) {
  var code = req.query.code;
  var params = JSON.stringify({
    "client_id": "fc30a89abaa8a953a070443edcb5317c3d7d27c0866104a60420e687f4f75cce",
    "client_secret": process.env.SECRET_KEY,
    "code": code,
    "grant_type": "authorization_code",
    "redirect_uri": "http://localhost:3000/mlh/user"
  });

  var options = {
    host: 'https://my.mlh.io',
    path: '/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  request.post('https://my.mlh.io/oauth/token', {body: params, headers: options.headers},
    function(err, response, body) {
    if (err || response.statusCode !== 200) {
      res.send('FAILED!').end();
    } else {
      res.status(200).send(body).end();
    }
  });
});

router.put('/user', function(req, res, next) {
  console.log(req.body);
  var token = req.body.token;
  request.get('https://my.mlh.io/api/v2/user.json?access_token=' + req.body.token,
    function(err, response, body) {
        if (err || response.statusCode !== 200) {
        res.send('Error:' + err + "\n" + JSON.stringify(response)).end();
      } else {
        res.status(200).send(body).end();
      }
    });
});

module.exports = router;
