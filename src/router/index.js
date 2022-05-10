import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
// 由于登录部分组件是index.vue这里可以省略

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
