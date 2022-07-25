const express = require('express')
const router = express.Router()
const db = require('./db')
const check = require('./check')
const checkLogin = check.checkLogin

// 验证登录状态
router.get('/api/admin/logStatus', function (req, res) {
  checkLogin(req, res)
  res.json({type: 'success'})
})


// 退出登录
router.get('/api/admin/logout', function (req, res) {
  delete req.session.username;
  res.json({type: 'logout success'})
})


// 注册
router.post('/api/admin/signup', function (req, res) {
  new db.User(req.body.userInfo).save(
    function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send()
  })
})

// 登录
router.post('/api/admin/signin', function (req, res) {
  req.session.username = req.body.userInfo.name
  res.send()
})

// 根据用户名获取用户
router.get('/api/admin/getUser/:name', function (req, res) {
  db.User.findOne({ name: req.params.name }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    // console.log(docs)
    // {
    //   _id: 6277385f00965f39643c7a66,
    //   name: 'jybwhy',
    //   password: '123456',
    //   __v: 0
    // }
    res.send(docs)
  })
})




// 获取所有文章
router.get('/api/articleList', function (req, res) {
  checkLogin(req, res)
  db.Article.find({}, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.json(docs)
  })
})

// 文章详情页
router.get('/api/articleDetail/:id', function (req, res) {
  db.Article.findOne({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})

// 文章保存
router.post('/api/admin/saveArticle', function (req, res) {
  new db.Article(req.body.articleInformation).save(function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

// 文章更新
router.post('/api/admin/updateArticle', function (req, res) {
  let info = req.body.articleInformation
  db.Article.find({_id: info._id}, function (err, docs) {
    if (err) {
      return
    }
    docs[0].title = info.title
    docs[0].date = info.date
    docs[0].content = info.content
    docs[0].gist = info.gist
    docs[0].labels = info.labels
    db.Article(docs[0]).save(function (err) {
      if (err) {
        res.status(500).send()
        return
      }
      res.send()
    })
  })
})

// 文章删除
router.post('/api/admin/deleteArticle', function (req, res) {
  db.Article.remove({_id: req.body._id}, function (err) {
    if (err) {
      res.status(500).send()
      return
    }
    res.send()
  })
})

module.exports = router