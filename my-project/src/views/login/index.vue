<template>
  <div class="login">
    <div class="login-header">
      <div class="login-headerBack" @click="$router.go(-1)">
        <Icon type="ios-arrow-back" color="#fff" size=32></Icon>
      </div>

      <div class="login-headerTitle">
        <span>登录</span>
      </div>

      <div class="login-headerHome">
        <router-link exact to="/home"><Icon type="home" color="#fff" size=32></Icon></router-link>
      </div>
    </div>

    <div class="login-content">
      <div class="login-contentForm">
        <div class="login-contentUserName">
          <label for="userName">账号</label>
          <input type="text" id="userName" placeholder="请输入手机号/邮箱" v-model.trim="userName" />
        </div>

        <div class="login-contentPassword">
          <label for="password">密码</label>
          <input type="text" id="password" placeholder="请输入密码" v-model.trim="password" />
          <Icon type="ios-eye-outline" size=20 class="login-contentPassword-eye"></Icon>
        </div>

        <div class="login-contentAuthCode">
          <label for="authCode">验证码</label>
          <input type="text" id="authCode" v-model.trim="authCode" />
          <span></span>
          <span class="login-contentChangeCode">换一换</span>
        </div>

        <p v-if="error" class="errorTxt">{{error}}</p>
      </div>

      <div class="login-contentLoginBtn">
        <a href="javascript:void(0);">登录</a>
      </div>

      <div class="login-contentOtherOption">
        <a href="javascript:void(0);" class="login-forgetPsw">忘记密码</a>
        <router-link exact to="/register"><a href="javascript:void(0);" class="login-register"> 注册 </a></router-link>
      </div>

      <div class="login-contentTip">
        <p>点击上面“登录”按钮</p>
        <p>即表示您同意<a href="javascript:void(0);">《阿里文学用户服务协议》</a><a href="javascript:void(0);">《隐私服务协议》</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: '',
      authCode: '',
      error: ''
    }
  }
}
</script>

<style scoped>
.login-header {
  width: 100%;
  background-color: #007AFF;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: .5rem 1rem;
}

.login-headerTitle span {
  color: #fff;
  font-size: 20px;
}

.login-content {
  background-color: #fff;
}

.login-contentForm {
  width: 100%;
  padding-top: 1rem;
}

.login-contentForm div {
  width: 80%;
  margin: 2rem auto;
  border-bottom: 1px solid #f3f3f3;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  font-size: 1rem;
  position: relative;
  align-items: center;
}

.login-contentForm div input{
  border: 0;
  outline: none;
  text-indent: 1rem;
}

.login-contentPassword-eye, .login-contentAuthCode span {
  right: 0;
  position: absolute;
}

span.login-contentChangeCode {
  color: #007AFF;
  font-size: 14px;
}

p.errorTxt {
  color: red;
}

.login-contentLoginBtn {
  width: 80%;
  margin: 1rem auto;
}

.login-contentLoginBtn a {
  display: block;
  width: 100%;
  height: 3rem;
  background-color: #007AFF;
  color: #fff;
  font-size: 1rem;
  line-height: 3rem;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 2px 3px 2px #e2e2e2;
}

.login-contentOtherOption {
  width: 80%;
  margin: 1rem auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.login-contentOtherOption a {
  font-size: 14px;
}

a.login-forgetPsw {
  color: #999;
}

.login-contentTip {
  width: 60%;
  margin: 1rem auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 14px;
}

</style>
