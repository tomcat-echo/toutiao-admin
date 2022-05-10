<template>
  <div class="login-container">
    <el-form ref="user" :model="user" class="login-form">
      <el-form-item class="login-logo"></el-form-item>
      <el-form-item>
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item >
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" class="login-btn">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import request from '@/utlis/request.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
      const user = this.user

      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log('登录失败', err)
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  position : fixed;
  top :0;
  left : 0;
  right : 0;
  bottom : 0;
  //整个背景填满

  display: flex;
  justify-content: center;
  align-items: center;
  // 内容居中

  background: url(./login_bg.jpg) no-repeat;
  background-size: cover;
  // 背景图片填满
  .login-form{
    background-color: #fff;
    padding: 50px;
    min-width: 300px;

  .login-logo{
    //顶部logo
    background: url(./logo_index.png) no-repeat;
    width: 300px;
    height: 57px;
  }
  .login-btn{
    // 登录按钮
    width: 100%;
  }
}
}

</style>
