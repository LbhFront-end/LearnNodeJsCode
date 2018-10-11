var User = require('../models/user')
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var util = require('util');


// 动态视图助手
router.use(function (req, res, next) {
  res.locals.user=req.session.user;
  var err = req.flash('error');
  var success = req.flash('success');

  res.locals.error = err.length ? err : null;
  res.locals.success = success.length ? success : null;
   
  next();
});

// 正式微博路由
router.get('/', function (req, res, next) {
  res.render('index', { title: '首页' });
});
// 用户的主页 
router.get('/u/:user', function (req, res, next) {

});
// 用户注册
router.get('/reg', function (req, res, next) {
  res.render('reg', { title: '用户注册' });
});
router.post('/reg', function (req, res, next) {
  console.log(res.body);
  if (req.body['password-repeat'] != req.body['password']) {
    req.flash('error', '两次输入的口令不一致');
    return res.redirect('/reg');
    }
  // 生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  var newUser = new User({
    name: req.body.username,
    password: password,
  });

  // 检查用户名是否存在
  User.get(newUser.name, function (err, user) {
    if (user) {
      err = "Username is already exists."
    }
    if (err) {
      req.flash('error', err);
      return res.redirect('/reg');
    }
    // 如果不存在则新增用户
    newUser.save(function (err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.flash('success', '注册成功');
      res.redirect('/reg');
    });
  });
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
