import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/element.js'

import './assets/css/common.css'

Vue.config.productionTip = false

// 导入封装好的axios
import http from './http.js'
Vue.prototype.$http = http

// 路由守卫对没有登录进入页面进行拦截
router.beforeEach((to,from,next) => {
  if (localStorage.token) {
    next()
  } else {
    if(to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
