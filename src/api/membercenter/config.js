import request from '@/utils/request'

/**
 * 个人模块-配置管理列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSceneList(data) {
  return request({
    url: '/admins/ldmember/Config',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加个人模块-配置
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addScene(data) {
  return request({
    url: '/admins/ldmember/Config',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改个人模块-配置
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editScene(data) {
  return request({
    url: '/admins/ldmember/Config/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除个人模块-配置
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delScene(data) {
  return request({
    url: '/admins/ldmember/Config?id=' + data,
    method: 'delete',
    params: {}

  })
}
