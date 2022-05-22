import Vue from 'vue'
import VueRouter from 'vue-router'
// 由于登录部分组件是index.vue这里可以省略

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login')
    // 路由懒加载
  },
  {
    path: '/Layout',
    // name: 'layout',
    // 由于有默认子路由，这里的name就没有了意义，因此去掉name
    component: () => import('@/views/Layout'),
    // 使用路由嵌套将组件放入layout的子路由下
    children: [
      {
        path: '', // 空为默认子路由
        name: 'home',
        component: () => import('@/views/home')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
