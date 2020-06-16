import request from '@/utils/request'

/**
 * 获取一条操作日志
 * @param {Number} action_log_id
 * @returns {AxiosPromise}
 */
export function getActionLogItem(action_log_id) {
  return request({
    url: '/v3/action_log',
    method: 'post',
    params: {
      method: 'get.action.log.item'
    },
    data: {
      action_log_id
    }
  })
}

/**
 * 获取操作日志列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getActionLogList(data) {
  return request({
    url: '/v3/action_log',
    method: 'post',
    params: {
      method: 'get.action.log.list'
    },
    data
  })
}
