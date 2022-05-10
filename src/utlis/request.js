// 基于 axios 封装的请求模块
import axios from 'axios'

// 创建一个axios实例，通过实例发送请求，需要的配置交给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
  // 请求的基础地址
})

// 导出请求方法
export default request
