var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var util = require('util');
var flash = require('connect-flash');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');




// 加载路由控制
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 创建项目实例
var app = express();

app.use(flash());
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 定义日志和输出级别
app.use(logger('dev'));

// 定义数据解析器
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 定义cookie解析器
app.use(cookieParser());

// express.cookieParser()  是 Cookie 解析的中间件。 express.session()  则
// 提供会话支持，设置它的  store  参数为  MongoStore  实例，把会话信息存储到数据库中，
// 以避免丢失。
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  secret: settings.cookieSecret,
  store: new MongoStore({
    host: settings.host,
    db: settings.db,
    url: settings.url,
  })
}));

// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app 静态视图助手
// 静态视图助手变量
app.locals.appName = 'NodeExpressBlog';
app.locals.sayHello = function () {
  return 'Welcome to my NodeExpressBlog';
}
app.locals.inspect = function (obj) {
  return util.inspect(obj, true);
}



module.exports = app;
