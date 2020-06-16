import request from '@/utils/request'

/**
 * 添加一个公众号
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addGzhItem(data) {
  return request({
    url: '/adm/account/newitem',
    method: 'post',
    params: {},
    data
  })
}
/**
 * 编辑一个公众号
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setGzhItem(data) {
  return request({
    url: '/adm/account/setitem',
    method: 'post',
    params: {},
    data
  })
}

/**
 * 批量删除公众号
 * @param {Array} acid
 * @returns {AxiosPromise}
 */
export function delGzhList(acid) {
  return request({
    url: 'adm/account/delitem',
    method: 'post',
    params: {},
    data: {
      acid
    }
  })
}

/**
 * 获取公众号列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getList(data) {
  return request({
    url: '/adm/account/getlist',
    method: 'post',
    params: {},
    data
  })
}
