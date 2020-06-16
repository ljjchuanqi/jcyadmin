import request from '@/utils/request'

/**
 * 获取会员中心商家管理商家分类列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getShopTypeList(data) {
  return request({
    url: '/admins/ld012/ShopType/index',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加商家管理商家分类
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addScene(data) {
  return request({
    url: '/admins/ld012/ShopType/save',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改商家管理商家分类
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editScene(data) {
  return request({
    url: '/admins/ld012/ShopType/update/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除商家管理商家分类
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delScene(data) {
  // return request({
  //   url: '/admins/ldmember/Growth?id=' + data,
  //   method: 'delete',
  //   params: {}

  // })
  return {
    'code': -1
  }
}
