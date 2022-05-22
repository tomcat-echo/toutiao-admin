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
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 后端需要得到token授权，axios可通过hearder的设置
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODQ2NzA5NjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.WhOKFeTQbM_-4iU752xZESeww97r_cy5Cky9SCwHpy8'
    }
  })
}
