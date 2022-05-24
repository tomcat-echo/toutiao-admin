// 基于 axios 封装的请求模块
import axios from 'axios'

// 创建一个axios实例，通过实例发送请求，需要的配置交给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
  // 请求的基础地址
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
  // Do something before request is sent（1） 获取本地存储数据
    const user = JSON.parse(window.localStorage.getItem('user'))
    // （2）做条件判断，如果有数据就传给config发出请求
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
  // Do something with request error
    return Promise.reject(error)
  }
)
// 响应拦截器

// 导出请求方法
export default request
