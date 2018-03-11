// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, Axios)

import Iview from 'iview'
import '@/assets/css/iview.css'
Vue.use(Iview)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/img/failImg.jpg'),
  loading: require('@/assets/img/lazyImg.gif'),
  attempt: 1,
  listenEvents: [ 'scroll', 'mousewheel' ]
})


import '@/assets/css/app'

import Global_ from '@/components/GlobalValue'
Vue.prototype.MyGlobal = Global_

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
