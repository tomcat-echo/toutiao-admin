<template>
  <div class="header-container">
    <div class="fold">
      <el-tooltip class="item" effect="dark" :content="isCollapse? '打开':'折叠'"
      :disabled='isCollapse'
      placement="bottom-start">

        <i :class="{
          'el-icon-s-fold': isCollapse,
          'el-icon-s-unfold': !isCollapse
        }"
        @click="collapse()"
        ></i>
      </el-tooltip>
      <span>头条发布管理系统</span>
    </div>
      <el-dropdown>
        <div class="avatar-wrap">
          <img class="avatar" :src="userProfile.photo" alt="">
          <span>{{userProfile.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item
          @click.native="logOut"
          >退出</el-dropdown-item>
          <!-- 原生事件在组件中不起作用，加.native -->
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  components: {},
  props: {
    userProfile: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    collapse () {
      this.isCollapse = !this.isCollapse
      this.$bus.$emit('isCollapse', this.isCollapse)
    },
    logOut () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 去除用户登录状态
        window.localStorage.removeItem('user')
        // 跳转到登录界面
        this.$router.push('/Login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-dropdown-link,i {
    cursor: pointer;
  }
.header-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .fold i{
    margin-right: 5px;
  }
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
