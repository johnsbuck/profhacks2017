var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/auth', function(req, res, next) { // TODO Fix /auth/mlh issue redirecting to default search page
  res.redirect("https://mlh.io");
});

module.exports = router;
