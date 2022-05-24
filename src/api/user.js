import request from '@/utlis/request'

// 用户登录信息
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
    // data === user
  })
}

// 获取用户信息
export const getUserProfile = () => {
  // 这里用的是对象，所以要先将JSON字符串转化成对象
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端需要得到token授权，axios可通过hearder的设置
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
