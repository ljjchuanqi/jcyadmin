import request from '@/utils/request'

/**
 * 获取奖品列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSceneGoods(data) {
  return request({
    url: '/admins/ld010/SceneGoods',
    method: 'get',
    params: { ...data }

  })
}

/**
 * 增加场次
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addSceneGoods(data) {
  return request({
    url: '/admins/ld010/SceneGoods',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改场次
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editSceneGoods(data) {
  return request({
    url: '/admins/ld010/SceneGoods/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除奖品
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delSceneGoods(data) {
  return request({
    url: '/admins/ld010/SceneGoods/' + data,
    method: 'delete',
    params: {}

  })
}
