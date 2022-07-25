// 检查用户是否登录

module.exports = {
  checkLogin: function (req, res) {
    if (!req.session.username) {
      console.log('用户未登录')
      return res.redirect('/signin')
    }
  }
}