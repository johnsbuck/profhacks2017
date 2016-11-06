var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/auth', function(req, res, next) { // TODO Fix /auth/mlh issue redirecting to default search page
  res.redirect("https://my.mlh.io/oauth/authorize?client_id=fc30a89abaa8a953a070443edcb5317c3d7d27c0866104a60420e687f4f75cce" +
    "&redirect_uri=http://localhost:3000/mlh&response_type=code&scope=email+education+birthday");
  /*res.redirect("https://my.mlh.io/oauth/authorize?client_id=fc30a89abaa8a953a070443edcb5317c3d7d27c0866104a60420e687f4f75cce" +
    "&redirect_uri=http://localhost:3000/mlh&response_type=token&scope=email+education+birthday")*/
});

module.exports = router;
