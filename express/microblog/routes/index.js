var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/hello', function (req, res, next) {
  res.send('The time is ' + new Date().toString());
});
router.all('/user/:username', function (req, res, next) {
  console.log('all methods captured');
  next();
});
router.get('/user/:username', function (req, res, next) {
  res.send('user: ' + req.params.username);
});
module.exports = router;
