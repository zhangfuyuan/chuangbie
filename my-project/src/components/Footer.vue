<template>
  <div class="footer">
    <div class="footer-router">
      <ul>
        <li>
          <router-link exact to="/home"><a href="javascript:void(0);">回首页</a></router-link>
        </li>

        <li>
          <router-link exact to="/bookrack"><a href="javascript:void(0);">我的书架</a></router-link>
        </li>

        <li>
          <router-link exact to="/login"><a href="javascript:void(0);">登录</a></router-link>
        </li>

        <li>
          <router-link exact to="/register"><a href="javascript:void(0);">注册</a></router-link>
        </li>

        <li>
          <a href="#">回顶部</a>
        </li>
      </ul>
    </div>

    <div class="footer-info">
        版权所有 北京恺兴文化传媒有限公司
        <br>
        京ICP备11033518号
        <br>
        京网文（2016）1179-149号
        <br>
        京ICP证111027号
        <br>
        © 2013-2016 chuangbie.com, all rights reserved
        <br>
        客服 4008884032 QQ:613762569
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.footer-router {
  width: 100%;
}

.footer-router>ul {
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e2e2e2;
}

.footer-router>ul li {
  width: 20%;
  height: 48px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.footer-router>ul li:first-of-type a {
  border-left: 0;
}

.footer-router>ul li a {
  width: 100%;
  border-left: 1px solid #e2e2e2;
  font-size: 14px;
}

.footer-info {
  padding: 1rem 0;
  font-size: 12px;
  color: #7a7a7a;
}


</style>
