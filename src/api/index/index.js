import request from '@/utils/request'
/**
 * 动态调用接口
 * @returns {AxiosPromise}
 */
export function requestUrl(url, data) {
  return request({
    url: url,
    method: 'get',
    params: { ...data }
  })
}

/**
 * 清空所有缓存
 * @returns {AxiosPromise}
 */
export function clearCacheAll() {
  return request({
    url: '/v3/index',
    method: 'post',
    params: {
      method: 'clear.cache.all'
    }
  })
}

/**
 * 调整最优状态(服务端为正式环境有效)
 * @returns {AxiosPromise}
 */
export function setSystemOptimize() {
  return request({
    url: '/v3/index',
    method: 'post',
    params: {
      method: 'set.system.optimize'
    }
  })
}

/**
 * 批量调用
 * @param {Array} data
 * @returns {AxiosPromise}
 */
export function batchRequests(data) {
  return request({
    url: '/batch',
    method: 'post',
    params: {
      method: null
    },
    data: {
      batch: data
    }
  })
}
