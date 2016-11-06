var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var code = req.query.code;
  var params = JSON.stringify({
    "client_id": "fc30a89abaa8a953a070443edcb5317c3d7d27c0866104a60420e687f4f75cce",
    "client_secret": process.env.SECRET_KEY,
    "code": code,
    "grant_type": "authorization_code",
    "redirect_uri": "http://localhost:3000/"
  });

  var options = {
    host: 'https://my.mlh.io',
    path: '/oauth/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(code + '\n' + typeof(code) + "\n\n");
  console.log(params + "\n\n");
  console.log(options.headers);

  request.post('https://my.mlh.io/oauth/token', {body: params, headers: options.headers},
    function(err, response, body) {
    if (err) {
      res.send('FAILED!').end();
    } else {
      res.send(response).end();
    }
  });
});

module.exports = router;
