<template>
  <div class="login-container">
    <el-form ref="login-form" :model="user" :rules='rules' class="login-form">
      <el-form-item class="login-logo"></el-form-item>
      <el-form-item   prop='mobile'>
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item    prop='code'>
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop='agree'>
        <el-checkbox v-model="user.agree" >我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin"
        :loading="onLoading"
        class="login-btn">登录</el-button>
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
        code: '',
        agree: false
      },
      checked: false,
      onLoading: false,
      // 让这个变量控制状态而不是写死
      rules: {
        // 表单验证规则配置
        // 要验证的数据名称：规则列表[]
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              // value是agree的值
              if (value) {
                return callback()
              } else {
                callback(new Error('请勾选同意协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
      // 表单验证
      this.$refs['login-form'].validate((valid) => {
        if (!valid) {
          // 验证没有通过就不执行登录操作，并进行验证提示
          return
        }
        // 验证通过进行登录
        this.login()
      })
    },
    login () {
      // 开启登陆中 loading...

      this.onLoading = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: this.user
      }).then((result) => {
        console.log(result)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading
        this.onLoading = false
      }).catch((err) => {
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        this.onLoading = false
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
