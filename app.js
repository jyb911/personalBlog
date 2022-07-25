const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParse = require('body-parser')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const router = require('./server/router')
const app = express()

const resolve = file => path.resolve(__dirname, file)

app.use('/dist', express.static(resolve('./dist')))
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))


// session
app.set('trust proxy', 1) // trust first proxy
// secret 一个 String 类型的字符串，作为服务器端生成 session 的签名
// name 返回客户端的 key 的名称，默认为 connect.sid,也可以自己设置
// resave 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
// saveUninitialized 强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于
// 未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默
// 认：true）。建议手动添加。
// cookie 设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
// rolling 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）

// 此时req对象还没有session这个属性
app.use(session({
  secret: 'blog',
  name: 'name',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 2592000000                                                          
  },
  // 将session保存到数据库
  store: new MongoStore({
    url: 'mongodb://localhost:27017/blog',
    touchAfter: 24 * 3600
  })
}))
// 经过中间件处理后，可以通过req.session访问session object
// req在经过session中间件的时候就会自动完成session的有效性验证、延期/重新颁发、以及对session中数据的获取

app.use(router)

app.get('*', function (req, res) {
  let html = fs.readFileSync(resolve('./' + 'index.html'), 'utf-8')
  res.send(html)
})

app.listen(3000, function () {
  console.log('访问地址为 localhost:3000')
})