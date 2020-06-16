import request from '@/utils/request'

/**
 * 获取粉丝福利奖品列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSceneGoodsLog(data) {
  return request({
    url: '/admins/ld010/Log',
    method: 'get',
    params: { ...data }

  })
}

/**
 * 获取会员中心 我的奖励
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getMyGoodsLog(data) {
  return request({
    url: '/admins/ld009/Award',
    method: 'get',
    params: { ...data }

  })
}
