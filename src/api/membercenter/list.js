import request from '@/utils/request'

/**
 * 获取个人中心场次列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getFanswelfareList(data) {
  return request({
    url: '/admins/ld010/Scene',
    method: 'get',
    params: { ...data }

  })
}

/**
 * 获取个人中心场次分类
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getFanswelfareScenetype(data) {
  return request({
    url: '/admins/ld010/Scene/type',
    method: 'get',
    params: { ...data }

  })
}

/**
 * 增加场次
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addScene(data) {
  return request({
    url: '/admins/ld010/Scene',
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
export function editScene(data) {
  return request({
    url: '/admins/ld010/Scene/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除场次
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delScene(data) {
  return request({
    url: '/admins/ld010/Scene?id=' + data,
    method: 'delete',
    params: {}

  })
}
