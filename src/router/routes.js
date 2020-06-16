import index from './modules/index'
import system from './modules/system'
import wechat from './modules/wechat'
import membercenter from './modules/membercenter'
import setting from './modules/setting'
import member from './modules/member'
import promotion from './modules/promotion'
import order from './modules/order'
import goods from './modules/goods'
import gzt from './modules/gzt'

/**
 * 在主框架内显示
 */
const frameIn = [
  index,
  system,
  wechat,
  membercenter,
  setting,
  member,
  promotion,
  order,
  goods,
  gzt
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/public/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
