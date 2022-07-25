<template>
  <div id="sign_wrap" v-if="!isShow">
    <h1>后台管理</h1>
    <el-input v-model="name" placeholder="请输入用户名"></el-input>
    <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
    <el-button @click="signup">注册</el-button>
    <el-button type="primary" @click="signin">登录</el-button>
  </div>
  <div v-else class="logout">
    <div class="logtext">已登录</div>
    <el-button @click="logout">退出登录</el-button>
  </div>
</template>

<script>
  export default {
    name: 'signin',
    data() {
      return {
        name: '',
        password: '',
        hasName: false, // 用户名被占
        isShow: false
      }
    },
    mounted: function () {
        let _this = this
        this.$http.get('api/admin/logStatus').then(
          res => {
            if (res.data.type == "success") {
              _this.isShow = true
            }
          }
        )
    },

    methods: {
      // 注册
      signup: function () {
        let _this = this;

        if (this.name.length < 6) {
          this.$message.error('用户名不能为空或小于六个字符')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('密码不能为空或小于六个字符')
          return
        }

        // vue-resource插件提供请求API
        this.$http.get('/api/admin/getUser/' + this.name).then(
          // 成功回调
          response => {
            if (response.body.name === _this.name) {
              _this.$message.error('该用户已存在')
              _this.name = '';
              _this.password = '';
              // 由于异步，name的改变比正常流执行得慢，所以不能通过判断name去执行是否post
              // 所以我把post移入else中，而不是在外面通过判断name执行
            } else {
              let obj = {
                name: _this.name,
                password: _this.password
              }

              _this.$http.post('/api/admin/signup', {
                userInfo: obj
              }).then(
                response => {
                  _this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                },
                response => {
                  _this.$message({
                    message: '注册失败',
                    type: 'failed'
                  })}
              )
            }
          },
          // 失败回调
          response => console.log(response)
        )
      },
      signin: function () {
       // 异步回调函数中的this指向window，而$message、$http、$router都是vue上的，所以要提前保存this 
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('用户名不能为空或小于六个字符')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('密码不能为空或小于六个字符')
          return
        }

        this.$http.get('/api/admin/getUser/' + this.name).then(
          response => {
            if (_this.password !== response.body.password) {
              _this.$message.error('用户名或密码不正确')
            } else {
              let obj = {
                name: _this.name,
                password: _this.password
              }
              _this.$http.post('/api/admin/signin', {
                userInfo: obj
              }).then(
                response => {
                  _this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                  delete _this.password;
                  _this.$router.go(-1)
                },
                response => console.log('登录失败'+response)
              )
            }
          },
          response => {
            _this.$message.error('该用户不存在')
            return
          }
        )
      },
      logout () {
        this.isShow = false
        this.$http.get('/api/admin/logout').then(
          res => console.log('success', res),
          err => console.log('err', err)
        )
      }
    }
  }
</script>

<style>
  #sign_wrap {
    width: 300px;
    margin: 200px auto;
  }

  #sign_wrap h1 {
    color: #383a42;
    padding: 10px;
  }

  #sign_wrap div {
    padding-bottom: 20px;
  }
  .logout {
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .logtext {
    margin: 20px;
  }
</style>