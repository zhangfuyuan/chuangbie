<template>
  <div class="register">
    <div class="login-header">
      <div class="login-headerBack" @click="$router.go(-1)">
        <Icon type="ios-arrow-back" color="#fff" size=32></Icon>
      </div>

      <div class="login-headerTitle">
        <span>注册</span>
      </div>

      <div class="login-headerHome">
        <router-link exact to="/home"><Icon type="home" color="#fff" size=32></Icon></router-link>
      </div>
    </div>

    <div class="login-content">
      <div class="login-contentForm">
        <div class="login-contentUserName">
          <label for="phone">手机号</label>
          <input type="text" id="phone" placeholder="请输入手机号" v-model.number.trim="phone" />
        </div>

        <p v-if="error" class="errorTxt">{{error}}</p>
      </div>

      <div class="login-contentLoginBtn">
        <a href="javascript:void(0);">获取验证码</a>
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
  name: 'register',
  data () {
    return {
      phone: '',
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
