import request from '@/utils/request'

/**
 * 获取会员中心商家管理商家产品列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSceneList(data) {
  return request({
    url: '/admins/ld012/Product/index',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加产品
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addScene(data) {
  return request({
    url: '/admins/ld012/Product/save',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改产品
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editScene(data) {
  return request({
    url: '/admins/ld012/Product/update/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除产品
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
