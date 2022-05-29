import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
// 进度条

// 由于登录部分组件是index.vue这里可以省略

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
    // 路由懒加载
  },
  {
    path: '/layout',
    // name: 'layout',
    // 由于有默认子路由，这里的name就没有了意义，因此去掉name
    component: () => import('@/views/Layout'),
    // 使用路由嵌套将组件放入layout的子路由下
    children: [
      {
        path: '', // 空为默认子路由
        name: 'Home',
        component: () => import('@/views/home')
      },
      {
        path: '/article',
        name: 'Article',
        component: () => import('@/views/article')
      },
      {
        path: '/publish',
        name: 'Publish',
        component: () => import('@/views/publish')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// vue的路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 非登录页没token授权，跳转到登录页
  if (to.name !== 'Login' && !user) next({ name: 'Login' })
  else next()
})

router.afterEach((to, from) => {
  // 结束顶部的导航进度条
  NProgress.done()
})
export default router
