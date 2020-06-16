import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/membercenter',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      meta: { ...meta, cache: true, title: '会员中心首页' },
      component: () => import('@/views/membercenter/index')
    },
    {
      path: 'fanswelfare/list',
      name: `${pre}fanswelfare-list`,
      meta: { ...meta, cache: true, title: '粉丝福利' },
      component: () => import('@/views/membercenter/fanswelfare/list')
    },
    {
      path: 'fanswelfare/awards',
      name: `${pre}fanswelfare-awards`,
      meta: { ...meta, cache: true, title: '奖品列表' },
      component: () => import('@/views/membercenter/fanswelfare/awards')
    },
    {
      path: 'fanswelfare/awardsLogs',
      name: `${pre}fanswelfare-awardsLogs`,
      meta: { ...meta, cache: true, title: '奖品记录' },
      component: () => import('@/views/membercenter/fanswelfare/awardsLogs')
    },
    {
      path: 'myaward/logs',
      name: `${pre}myaward-logs`,
      meta: { ...meta, cache: true, title: '我的奖励' },
      component: () => import('@/views/membercenter/myaward/logs')
    },
    {
      path: 'scoreshop/goodslist',
      name: `${pre}scoreshop-goodslist`,
      meta: { ...meta, cache: true, title: '我的奖励' },
      component: () => import('@/views/membercenter/scoreshop/goodslist')
    },
    {
      path: 'scoreshop/exchangelogs',
      name: `${pre}scoreshop-exchangelogs`,
      meta: { ...meta, cache: true, title: '兑换记录' },
      component: () => import('@/views/membercenter/scoreshop/exchangelogs')
    },
    {
      path: 'shopmanage/typelist',
      name: `${pre}shopmanage-typelist`,
      meta: { ...meta, cache: true, title: '商家管理' },
      component: () => import('@/views/membercenter/shopmanage/typelist')
    }, {
      path: 'shopmanage/products',
      name: `${pre}shopmanage-products`,
      meta: { ...meta, cache: true, title: '产品列表' },
      component: () => import('@/views/membercenter/shopmanage/products')
    }, {
      path: 'shopmanage/productstype',
      name: `${pre}shopmanage-productstype`,
      meta: { ...meta, cache: true, title: '产品类型列表' },
      component: () => import('@/views/membercenter/shopmanage/productstype')
    }, {
      path: 'shopmanage/shops',
      name: `${pre}shopmanage-shops`,
      meta: { ...meta, cache: true, title: '商家入驻' },
      component: () => import('@/views/membercenter/shopmanage/shops')
    },
    {
      path: 'shopmanage/shopnews',
      name: `${pre}shopmanage-shopnews`,
      meta: { ...meta, cache: true, title: '商家资讯' },
      component: () => import('@/views/membercenter/shopmanage/shopnews')
    },
    {
      path: 'member/address',
      name: `${pre}member-address`,
      meta: { ...meta, cache: true, title: '地址管理' },
      component: () => import('@/views/membercenter/member/address')
    },
    {
      path: 'member/birthdayqy',
      name: `${pre}member-birthdayqy`,
      meta: { ...meta, cache: true, title: '生日权益' },
      component: () => import('@/views/membercenter/member/birthdayqy')
    },
    {
      path: 'member/config',
      name: `${pre}member-config`,
      meta: { ...meta, cache: true, title: '配置管理' },
      component: () => import('@/views/membercenter/member/config')
    },
    {
      path: 'member/gold',
      name: `${pre}member-gold`,
      meta: { ...meta, cache: true, title: '金币管理' },
      component: () => import('@/views/membercenter/member/gold')
    },
    {
      path: 'member/growth',
      name: `${pre}member-growth`,
      meta: { ...meta, cache: true, title: '成长管理' },
      component: () => import('@/views/membercenter/member/growth')
    },
    {
      path: 'member/index',
      name: `${pre}member-index`,
      meta: { ...meta, cache: true, title: '会员管理' },
      component: () => import('@/views/membercenter/member/index')
    },
    {
      path: 'member/level',
      name: `${pre}member-level`,
      meta: { ...meta, cache: true, title: '等级管理' },
      component: () => import('@/views/membercenter/member/level')
    },
    {
      path: 'member/medal',
      name: `${pre}member-medal`,
      meta: { ...meta, cache: true, title: '徽章管理' },
      component: () => import('@/views/membercenter/member/medal')
    },
    {
      path: 'member/signin',
      name: `${pre}member-signin`,
      meta: { ...meta, cache: true, title: '签到管理' },
      component: () => import('@/views/membercenter/member/signin')
    }
  ])('membercenter-')
}
