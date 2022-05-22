<template>
  <div class="header-container">
    <div class="fold">
      <i class="el-icon-s-fold"></i>
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
          <el-dropdown-item>退出</el-dropdown-item>
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
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.el-dropdown-link {
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
