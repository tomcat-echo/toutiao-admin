<template>
     <el-menu
      default-active="/"
      class="nav-menu"
      background-color="#a1c4fd"
      text-color="#fdfcfa"
      active-text-color="#888BD6"
      :collapse="isCollapse"
      router
      >
<!-- default-active="/" 默认首页被激活 -->
<!-- router 配合index跳转对应界面 -->
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article" >
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont icon-icon-log-manager"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont icon-publish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment" >
        <i class="iconfont icon-comments-fill"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="iconfont icon-mine_fans"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="iconfont icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    // 接收header的isCollpse状态，（isCollapse是header传值的方法名）
    this.$bus.$on('isCollapse', data => {
      this.isCollapse = data
    })
  },
  mounted () {},
  methods: { }
}
</script>

<style scoped lang="less">
.nav-menu {

  span{
    margin:0 20px;
    font-size: 18px;
  }
  i{
    font-size: 20px;
  }
  .iconfont {
    // margin-right: 20px;
    font-size: 25px;
  }
  .icon-publish,.icon-mine_fans{
    font-size: 18px;
    padding: 0 5px;
  }
}
</style>
