import util from '@/utils/util'
import { getMenuAuthList } from '@/api/auth/menu'
import { loginAdminUser, logoutAdminUser, jcyLoginAdminUser } from '@/api/user/admin'
import { getGzhList } from '@/api/gzh/gzh'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} payload dispatch
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     */
    login({ dispatch }, { username, password, randcode }) {
      return new Promise((resolve, reject) => {
        loginAdminUser(username, password, randcode)
          .then(res => {
            util.cookies.set('uuid', res.data.admin.username)
            util.cookies.set('token', res.data.token.token)
            dispatch('ldyxb/user/set', {
              name: res.data.admin.nickname,
              admin: res.data.admin,
              token: res.data.token
            }, { root: true })

            // 请求get.menu.list,并且由下个then处理
            return getMenuAuthList(null)
          })
          .then(menu => {
            dispatch('ldyxb/db/set', {
              dbName: 'database',
              path: '$menu.sourceData',
              value: menu.data,
              user: true
            }, { root: true })
            // 请求公众号列表,并且由下个then处理
            return getGzhList({ page_no: 1, page_size: 300 })
          })
          .then(gzh => {
            dispatch('ldyxb/db/set', {
              dbName: 'database',
              path: '$gzh.sourceData',
              value: gzh.data,
              user: true
            }, { root: true })
            resolve()
          })
          .catch(err => {
            util.cookies.remove('token')
            util.cookies.remove('uuid')
            reject(err)
          })
      })
    },
    /**
    * @description 检察院直接登录
    * @param {Object} payload dispatch

    */
    jcylogin({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        jcyLoginAdminUser(data)
          .then(res => {
            util.cookies.set('uuid', res.data.admin.username)
            util.cookies.set('token', res.data.token.token)
            dispatch('ldyxb/user/set', {
              name: res.data.admin.nickname,
              admin: res.data.admin,
              token: res.data.token,
              loginurl: window.location.href
            }, { root: true })

            // 请求get.menu.list,并且由下个then处理
            return getMenuAuthList(null)
          })
          .then(menu => {
            dispatch('ldyxb/db/set', {
              dbName: 'database',
              path: '$menu.sourceData',
              value: menu.data,
              user: true
            }, { root: true })
            // 请求公众号列表,并且由下个then处理
            return getGzhList({ page_no: 1, page_size: 300 })
          })
          .then(gzh => {
            dispatch('ldyxb/db/set', {
              dbName: 'database',
              path: '$gzh.sourceData',
              value: gzh.data,
              user: true
            }, { root: true })
            resolve()
          })
          .catch(err => {
            util.cookies.remove('token')
            util.cookies.remove('uuid')
            reject(err)
          })
      })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} payload dispatch
     * @param {Object} payload vm {Object} vue 实例
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout({ dispatch }, { vm, confirm = false }) {
      // 实际注销操作
      function logout() {
        logoutAdminUser()
          .finally(() => {
            // 删除info
            dispatch('ldyxb/user/set', {}, { root: true })

            // 删除cookie
            util.cookies.remove('token')
            util.cookies.remove('uuid')

            // 跳转路由并重新载入vue
            vm.$router.push({ name: 'index' }).catch(() => {})
            location.reload()
          })
          .catch(() => {
          })
      }

      if (!confirm) {
        logout()
        return
      }

      vm.$confirm('确定要执行注销操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          vm.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          logout()
        })
        .catch(() => {
        })
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    load({ commit, dispatch }) {
      return new Promise(async resolve => {
        // DB -> store 加载用户数据
        await dispatch('ldyxb/user/load', null, { root: true })
        // DB -> store 获取用户公众号列表
        await dispatch('ldyxb/gzh/loadList', null, { root: true })
        // DB -> store 获取用户公众号
        await dispatch('ldyxb/gzh/load', null, { root: true })
        // DB -> store 加载主题
        await dispatch('ldyxb/theme/load', null, { root: true })
        // DB -> store 加载页面过渡效果设置
        await dispatch('ldyxb/transition/load', null, { root: true })
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('ldyxb/page/openedLoad', null, { root: true })
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('ldyxb/menu/asideCollapseLoad', null, { root: true })
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('ldyxb/size/load', null, { root: true })
        // DB -> store 持久化数据读取菜单源数据
        await dispatch('ldyxb/menu/sourceDataLoad', null, { root: true })
        // end
        resolve()
      })
    }
  }
}
