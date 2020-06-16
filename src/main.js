import Vue from 'vue'
import App from './App'

import store from '@/store'
import ldyxb from '@/plugin/ldyxb'

// 菜单和路由设置
import router from './router'
import { frameInRoutes } from '@/router/routes'

import dayjs from 'dayjs'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
// 核心插件
Vue.use(ldyxb)
Vue.use(dayjs)
Vue.prototype.$dayjs = dayjs
// v-has
Vue.directive('has', {
  bind: function(el, binding) {
    if (!Vue.prototype.$has(binding.value)) {
      el.parentNode ? el.parentNode.removeChild(el) : el.style.display = 'none'
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('ldyxb/page/init', frameInRoutes)
  },
  mounted() {
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('ldyxb/account/load')
    // 获取并记录用户 UA
    this.$store.commit('ldyxb/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('ldyxb/fullscreen/listen')
  }
}).$mount('#app')
