import { uniqueId } from 'lodash'

// 创建 el-menu-item
export function elMenuItem(createElement, menu) {
  return createElement('el-menu-item',
    {
      props: {
        index: menu.path || uniqueId('yxb-menu-empty-')
      }
    }, [
      ...menu.icon ? [
        createElement('i', {
          attrs: {
            class: `fa fa-${menu.icon}`
          }
        })
      ] : [],
      ...menu.icon === undefined && !menu.iconSvg ? [
        createElement('i', {
          attrs: { class: 'fa fa-file-o' }
        })
      ] : [],
      ...menu.iconSvg ? [
        createElement('yxb-icon-svg', {
          props: { name: menu.iconSvg }
        })
      ] : [],
      createElement('span', { slot: 'title' }, menu.title || '未命名菜单')
    ])
}

// 创建 el-submenu
export function elSubmenu(createElement, menu) {
  return createElement('el-submenu',
    {
      props: {
        index: menu.path || uniqueId('yxb-menu-empty-')
      }
    }, [
      ...menu.icon ? [
        createElement('i', {
          slot: 'title', attrs: { class: `fa fa-${menu.icon}` }
        })
      ] : [],
      ...menu.icon === undefined && !menu.iconSvg ? [
        createElement('i', {
          slot: 'title', attrs: { class: 'fa fa-folder-o' }
        })
      ] : [],
      ...menu.iconSvg ? [
        createElement('yxb-icon-svg', {
          slot: 'title', props: { name: menu.iconSvg }
        })
      ] : [],
      createElement('span', { slot: 'title' }, menu.title || '未命名菜单'),
      ...menu.children.map(child => (child.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, child))
    ])
}
