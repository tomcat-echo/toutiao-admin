<template>
<el-container   class="layout-container">
  <el-aside  class="aside" width="auto">
    <app-aside class="aside-menu"
    />
  </el-aside>
  <el-container>
    <el-header class="header">
      <app-header
      :userProfile="user"
      ></app-header>
    </el-header>
    <el-main class="main">
      <router-view />
      <!-- 子路由出口 -->
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import AppAside from './component/aside.vue'
import AppHeader from './component/header.vue'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  props: {},
  data () {
    return {
      user: {},
      isCollapse: false
    }
  },
  computed: {},
  watch: {
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside-menu{
  height: 100%;
       // 撑满侧边栏
}
.header {
  background-color: #e7f0fd;
}

.main {
  background-color: #FFF;
}
</style>
