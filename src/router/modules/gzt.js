import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }
// 表单管理
const formmanage = [
  {
    path: 'index',
    name: `gzt-index`,
    meta: { ...meta, cache: true, title: '工作台首页' },
    component: () => import('@/views/gzt/index')
  },
  {
    path: 'formmanage/list',
    name: `gzt-formmanage-list`,
    meta: { ...meta, cache: true, title: '表单管理' },
    component: () => import('@/views/gzt/formmanage/list')
  },
  {
    path: 'formmanage/addform',
    name: `gzt-formmanage-addform`,
    meta: { ...meta, cache: true, title: '表单编辑' },
    component: () => import('@/views/gzt/formmanage/addform')
  },
  {
    path: 'formmanage/registerform',
    name: `gzt-formmanage-registerform`,
    meta: { ...meta, cache: true, title: '编辑注册表单' },
    component: () => import('@/views/gzt/formmanage/registerform')
  },
  {
    path: 'formmanage/history',
    name: `gzt-formmanage-history`,
    meta: { ...meta, cache: true, title: '表单提交记录' },
    component: () => import('@/views/gzt/formmanage/history')
  },
  {
    path: 'formmanage/formexport',
    name: `gzt-formmanage-formexport`,
    meta: { ...meta, cache: true, title: '表单导出列表' },
    component: () => import('@/views/gzt/formmanage/formexport')
  }
]
// 管理员表单
const adminform = [
  {
    path: 'adminform/list',
    name: `gzt-adminform-list`,
    meta: { ...meta, cache: true, title: '管理员表单管理' },
    component: () => import('@/views/gzt/adminform/list')
  },
  {
    path: 'adminform/addform',
    name: `gzt-adminform-addform`,
    meta: { ...meta, cache: true, title: '管理员表单编辑' },
    component: () => import('@/views/gzt/adminform/addform')
  },
  {
    path: 'adminform/registerform',
    name: `gzt-adminform-registerform`,
    meta: { ...meta, cache: true, title: '编辑管理员注册表单' },
    component: () => import('@/views/gzt/adminform/registerform')
  },
  {
    path: 'adminform/history',
    name: `gzt-adminform-history`,
    meta: { ...meta, cache: true, title: '管理员表单提交记录' },
    component: () => import('@/views/gzt/adminform/history')
  },
  {
    path: 'adminform/formexport',
    name: `gzt-adminform-formexport`,
    meta: { ...meta, cache: true, title: '管理员表单导出列表' },
    component: () => import('@/views/gzt/adminform/formexport')
  }
]
// 短信管理
const message = [
  {
    path: 'message/list',
    name: `gzt-message-list`,
    meta: { ...meta, cache: true, title: '短信管理' },
    component: () => import('@/views/gzt/message/list')
  },
  {
    path: 'message/addform',
    name: `gzt-message-addform`,
    meta: { ...meta, cache: true, title: '短信编辑' },
    component: () => import('@/views/gzt/message/addform')
  },
  {
    path: 'message/history',
    name: `gzt-message-history`,
    meta: { ...meta, cache: true, title: '短信发送记录' },
    component: () => import('@/views/gzt/message/history')
  },
  {
    path: 'message/formexport',
    name: `gzt-message-formexport`,
    meta: { ...meta, cache: true, title: '短信导出列表' },
    component: () => import('@/views/gzt/message/formexport')
  }
]
const routerMap = [...formmanage, ...adminform, ...message]
export default {
  path: '/gzt',
  component: layoutHeaderAside,
  children: routerMap
}
