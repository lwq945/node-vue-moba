import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 添加响应拦截器
http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    // err.response 是错误对象的返回的响应对象（axios规定的）
    // err.response.data 返回的数据，数据内容是我们后台设置的
    // 后端约定，要是请求报错，统一返回一个json，有message属性
    //console.log(err.response.data.message)
    // $message ele-ui消息提示
    // 当服务端返回错误代码，有message属性，就弹出message
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      })
    }

    return Promise.reject(err)
  }
)

export default http
