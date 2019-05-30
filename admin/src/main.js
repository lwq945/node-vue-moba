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

// 全局的混入 给上传图片组件请求时加 Authorization 授权
Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
