<template>
   <!-- 左侧侧边栏 -->
  <div id="left_menu">
    <div class="menu_name">
      <h1>Jay'S NOTEBOOK</h1>
      <h5>个人博客</h5>
    </div>
    <nav>
      <ul>
        <router-link to="/article">
          <li class="nav">
            <span>首页</span>
          </li>
        </router-link>
        <router-link to="/about">
          <li class="nav">
            <span>关于</span>
          </li>
        </router-link>
        <router-link to="/admin/signin">
          <li class="nav">
            <span>登录</span>
          </li>
        </router-link>
        <router-link to="/admin/articleList">
          <li class="nav">
            <span>管理</span>
          </li>
        </router-link>
        <router-link to="/admin/articleEdit">
          <li class="nav">
            <span>写文章</span>
          </li>
        </router-link>
      </ul>
    </nav>

    <!--下半部分  -->
    <div class="info">
      <img src="../assets/codecat.jpeg" alt="head">
      <div class="info_name">Jay</div>
      <div class="archive">
        <ul>
          <router-link to="/article">
            <li>
              <span class="archive_count">{{ articleNumber }}</span>
              <span class="archive_name">日志</span>
            </li>
          </router-link>
        </ul>
      </div>
      <ul class="communication">
        <li class="communication_item">
          <a href="https://jyb911.github.io">
            <span>在线博客</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://www.bilibili.com/">
            <span>摸会🐟</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://cn.vuejs.org/v2/guide/">
            <span>Vue</span>
          </a>
        </li>
        <li class="communication_item">
          <a href="https://react.docschina.org/">
            <span>React</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data() {
      return {
        articleNumber: ''
      }
    },
    mounted: function () {
      this.$http.get('/api/articleList').then(
        response => this.articleNumber = response.body.length,
        response => console.log(response)
      )
    }
  }
</script>

<style>
  #left_menu {
    float: left;
    width: 240px;
    margin-right: 20px;
  }

  @media (max-width: 767px) {
    #left_menu {
      display: none;
    }
  }

  #left_menu a:hover {
    color: #222;
    background: #f5f7f9;
  }

  .menu_name {
    background: rgb(38, 42, 48);
    color: white;
    padding: 10px 0;
  }

  nav {
    background: white;
    padding: 20px 0;
  }

  .nav {
    padding: 8px 20px;
    text-align: left;
  }

  .info {
    margin-top: 10px;
    padding: 20px;
    background: white;
  }

  .info_name {
    font-weight: 600;
    padding: 5px;
  }

  .info img {
    width: 120px;
    height: 120px;
  }

  .archive {
    padding-top: 20px;
  }

  .archive .archive_count {
    display: block;
    color: #222;
    font-weight: 600;
    font-size: 16px;
  }

  .archive .archive_name {
    display: block;
    color: #999;
    font-size: 14px;
  }

  .communication {
    padding-top: 20px;
  }

  .communication_item {
    display: inline-block;
    width: 40%;
    font-size: 14px;
    font-weight: 600;
    padding: 5px;
  }
</style>