import request from '@/utils/request'

/**
 * 添加一个广告位置
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addAdsPositionItem(data) {
  return request({
    url: '/v3/ads_position',
    method: 'post',
    params: {
      method: 'add.ads.position.item'
    },
    data
  })
}

/**
 * 编辑一个广告位置
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setAdsPositionItem(data) {
  return request({
    url: '/v3/ads_position',
    method: 'post',
    params: {
      method: 'set.ads.position.item'
    },
    data
  })
}

/**
 * 批量删除广告位置(支持检测是否存在关联广告)
 * @param {Array} position_id
 * @param {Number} not_empty
 * @returns {AxiosPromise}
 */
export function delAdsPositionList(position_id, not_empty = 0) {
  return request({
    url: '/v3/ads_position',
    method: 'post',
    params: {
      method: 'del.ads.position.list'
    },
    data: {
      ads_position_id: position_id,
      not_empty
    }
  })
}

/**
 * 批量设置广告位置状态
 * @param {Array} position_id
 * @param {Number} status
 * @returns {AxiosPromise}
 */
export function setAdsPositionStatus(position_id, status) {
  return request({
    url: '/v3/ads_position',
    method: 'post',
    params: {
      method: 'set.ads.position.status'
    },
    data: {
      ads_position_id: position_id,
      status
    }
  })
}

/**
 * 获取一个广告位置
 * @param {Number} position_id
 * @returns {AxiosPromise}
 */
export function getAdsPositionItem(position_id) {
  return request({
    url: '/v3/ads_position',
    method: 'post',
    params: {
      method: 'get.ads.position.item'
    },
    data: {
      ads_position_id: position_id
    }
  })
}

/**
 * 获取广告位置列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getAdsPositionList(data) {
  return request({
    url: '/v3/ads_position',
    method: 'post',
    params: {
      method: 'get.ads.position.list'
    },
    data
  })
}

/**
 * 获取广告位置选择列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getAdsPositionSelect(data) {
  return request({
    url: '/v3/ads_position',
    method: 'post',
    params: {
      method: 'get.ads.position.select'
    },
    data
  })
}
