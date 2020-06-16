import request from '@/utils/request'

/**
 * 个人模块-会员管理列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSceneList(data) {
  return request({
    url: '/admins/ldmember/Index',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加个人模块-会员
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addScene(data) {
  return request({
    url: '/admins/ldmember/Index',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改个人模块-会员
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editScene(data) {
  return request({
    url: '/admins/ldmember/Index/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除个人模块-会员
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delScene(data) {
  return request({
    url: '/admins/ldmember/Index?id=' + data,
    method: 'delete',
    params: {}

  })
}
