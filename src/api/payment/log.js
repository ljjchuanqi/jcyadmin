import request from '@/utils/request'

/**
 * 获取一笔充值记录
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getPaymentLogItem(data) {
  return request({
    url: '/v3/payment_log',
    method: 'post',
    params: {
      method: 'get.payment.log.item'
    },
    data
  })
}

/**
 * 获取充值记录列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getPaymentLogList(data) {
  return request({
    url: '/v3/payment_log',
    method: 'post',
    params: {
      method: 'get.payment.log.list'
    },
    data
  })
}
