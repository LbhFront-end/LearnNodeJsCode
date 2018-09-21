var express = require('express');
var router = express.Router();
var users = {
  'lbh': {
    name: 'lbh',
    website: 'http://laibh.top'
  }
};
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.all('/:username', function (req, res, next) {
  // 检查用户是否存在
  if (users[req.params.username]) {
    next();
  } else {
    next(new Error(req.params.username + ' does not exist.'));
  }
});
router.get('/:username', function (req, res) {
  // 用户一定存在，直接展示
  res.send(JSON.stringify(users[req.params.username]));
});
router.put('/:username', function (req, res) {
  // 修改用户信息
  res.send('Done');
});
module.exports = router;
