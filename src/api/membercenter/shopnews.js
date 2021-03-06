import request from '@/utils/request'

/**
 * 获取会员中心商家管理资讯类型列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSceneList(data) {
  return request({
    url: '/admins/ld012/ShopNews/index',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加资讯类型
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addScene(data) {
  return request({
    url: '/admins/ld012/ShopNews/save',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改资讯类型
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editScene(data) {
  return request({
    url: '/admins/ld012/ShopNews/update/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除资讯类型
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
