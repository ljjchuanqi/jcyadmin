import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/wechat',
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      meta: { ...meta, cache: true, title: '公众号首页' },
      component: () => import('@/views/wechat/index')
    },
    {
      path: 'gzh/list',
      name: `${pre}admin-member`,
      meta: { ...meta, cache: true, title: '公众号列表' },
      component: () => import('@/views/wechat/gzh/list')
    }
  ])('wechat-')
}
