<template>
  <div class="topbar bgSubColor">
    <div class="topbar-logo">
      <img src="../assets/img/logo.png" />
    </div>

    <div class="topbar-right">
      <router-link exact to="/login"><Icon class="topbar-icon" type="android-contact" color="#fff" size=30 title="登录"></Icon></router-link>
      <router-link exact to="/bookrack"><Icon class="topbar-icon" type="ios-bookmarks" color="#fff" size=30 title="书架"></Icon></router-link>
      <router-link exact to="/search"><Icon class="topbar-icon" type="android-search" color="#fff" size=30 title="搜索"></Icon></router-link>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  import Iview from 'iview'
  Vue.use(Iview)

  export default {
    name: 'Topbar'
  }
</script>

<style scoped>
.topbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 45px;
  padding: 5px;
  margin-bottom: 10px;
  justify-content: space-between;
}

.topbar-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.topbar-icon {
  margin: 0 10px;
  cursor: pointer;
}

</style>
