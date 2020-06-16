import request from '@/utils/request'

/**
 * 数据模型管理列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSceneList(data) {
  return request({
    url: '/admins/column/Table',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加数据模型
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addScene(data) {
  return request({
    url: '/admins/column/Table',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改数据模型
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editScene(data) {
  return request({
    url: '/admins/column/Table/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除数据模型
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delScene(data) {
  return request({
    url: '/admins/column/Table?id=' + data,
    method: 'delete',
    params: {}

  })
}
/**
 * 获取表字段名
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getTableFields(data) {
  return request({
    url: '/admins/column/Table/getTableFields',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 获取数据模型详情
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getTableDetail(data) {
  return request({
    url: '/admins/column/Table/' + data,
    method: 'get',
    params: {}
  })
}
