var User = require('../models/user')
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var util = require('util');


// 动态视图助手
router.use(function (req, res, next) {
  res.locals.user = req.session.user;
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
router.get('/reg', checkNotLogin);
router.get('/reg', function (req, res, next) {
  res.render('reg', { title: '用户注册' });
});
router.post('/reg', checkNotLogin);
router.post('/reg', function (req, res, next) {
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
      res.redirect('/');
    });
  });
});
// 用户登录
router.get('/login', checkNotLogin);
router.get('/login', function (req, res, next) {
  res.render('login', { title: '用户登录' });
});
router.post('/login', checkNotLogin);
router.post('/login', function (req, res, next) {
  // 生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  User.get(req.body.username, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在');
      return res.redirect('/login');
    }
    if (user.password != password) {
      req.flash('error', '用户口令错误');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', '登入成功');
    res.redirect('/');
  });
});
// 用户登出 
router.get('/logout', checkLogin);
router.get('/logout', function (req, res, next) {
  req.session.user = null;
  req.flash('success', '登出成功');
  res.redirect('/');
});

function checkLogin(req, res, next) {
  if(!req.session.user){
    req.flash('error','未登入');
    return res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next){
  if(req.session.user){
    req.flash('error','已登入');
    return res.redirect('/');
  }
  next();
}

module.exports = router;
