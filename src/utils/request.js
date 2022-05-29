// 基于 axios 封装的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建一个axios实例，通过实例发送请求，需要的配置交给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  // 请求的基础地址

  // 定义后端返回的原始数据的处理，阻止axios通过JSON.pares()转换造成的误差
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [function (data) {
    // console.log(data)

    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
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
