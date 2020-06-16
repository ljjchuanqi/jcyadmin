import request from '@/utils/request'

/**
 * 获取积分商城商品列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getGoodsList(data) {
  return request({
    url: '/admins/ld008/Goods',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加商品
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addGoods(data) {
  return request({
    url: '/admins/ld008/Goods',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改商品
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editGoods(data) {
  return request({
    url: '/admins/ld008/Goods/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除商品
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delGoods(data) {
  return request({
    url: '/admins/ld008/Goods?id=' + data,
    method: 'delete',
    params: {}

  })
}
/**
 * 获取积分商城兑换记录
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getExchangeLogsList(data) {
  return request({
    url: '/admins/ld008/Cov',
    method: 'get',
    params: { ...data }

  })
}
