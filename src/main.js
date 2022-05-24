import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'

// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
