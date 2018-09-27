var express = require('express');
var router = express.Router();
// var util = require('util');


// 动态视图助手
// router.use(function(req, res, next){
//   res.locals.appUrl = req.url;
//   res.locals.Welcome = function(){
//     return 'Welcome to my NodeExpressBlog, the url is: ' + res.locals.appUrl;
//   }
//   res.locals.headers = req.headers;
//   next();
// });
/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.get('/hello', function (req, res, next) {
//   res.send('The time is ' + new Date().toString());
// });
// router.all('/user/:username', function (req, res, next) {
//   console.log('all methods captured');
//   next();
// });
// router.get('/user/:username', function (req, res, next) {
//   res.send('user: ' + req.params.username);
// });


// router.get('/helper', function (req, res, next) {
//   res.render('helper', {
//     title: 'Helper'
//   });
// });
// router.get('/list', function (req, res, next) {
//   res.render('list', {
//     title: 'List',
//     items: [1995, 'lbh', 'express', 'Node.js']
//   });
// });

// 正式微博路由
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 用户的主页 
router.get('/u/:user', function (req, res, next) {
  
});
// 用户注册
router.route('/reg').
  all(function (req, res, next) {
    next()
  }).get(function (req, res, next) {
    next()
  }).post(function (req, res, next) {
    next()
  });
// 用户登录
router.route('/login').
  all(function (req, res, next) {
    next()
  }).get(function (req, res, next) {
    next()
  }).post(function (req, res, next) {
    next()
  });
// 用户登出 
router.get('/logout', function (req, res, next) {
  
});  
module.exports = router;
