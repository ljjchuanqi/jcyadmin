import request from '@/utils/request'

/**
 * 个人模块-徽章管理列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSceneList(data) {
  return request({
    url: '/admins/ldmember/Medal',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加个人模块-徽章
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addScene(data) {
  return request({
    url: '/admins/ldmember/Medal',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改个人模块-徽章
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editScene(data) {
  return request({
    url: '/admins/ldmember/Medal/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除个人模块-徽章
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delScene(data) {
  return request({
    url: '/admins/ldmember/Medal?id=' + data,
    method: 'delete',
    params: {}

  })
}
