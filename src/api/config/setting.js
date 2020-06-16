import request from '@/utils/request'

/**
 * 通用的接口获取
 * @param {Object} data
 * @param {String} method
 * @returns {AxiosPromise}
 */
function getRequest(data, method) {
  return request({
    url: '/v3/setting',
    method: 'post',
    params: {
      method: method
    },
    data: {
      data
    }
  })
}

/**
 * 获取某个模块的设置
 * @param {String} module
 * @param {String} code
 * @returns {AxiosPromise}
 */
export function getSettingList(module, code = '') {
  return request({
    url: '/v3/setting',
    method: 'post',
    params: {
      method: 'get.setting.list'
    },
    data: {
      module,
      code
    }
  })
}

/**
 * 设置配送轨迹
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setDeliveryDistList(data) {
  return getRequest(data, 'set.delivery.dist.list')
}

/**
 * 设置支付完成提示页
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setPaymentList(data) {
  return getRequest(data, 'set.payment.list')
}

/**
 * 设置配送优惠
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setDeliveryList(data) {
  return getRequest(data, 'set.delivery.list')
}

/**
 * 设置购物系统
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setShoppingList(data) {
  return getRequest(data, 'set.shopping.list')
}

/**
 * 设置售后服务
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setServiceList(data) {
  return getRequest(data, 'set.service.list')
}

/**
 * 设置系统配置
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setSystemList(data) {
  return getRequest(data, 'set.system.list')
}

/**
 * 设置上传配置
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setUploadList(data) {
  return getRequest(data, 'set.upload.list')
}

/**
 * 设置开放平台配置
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setPlatformList(data) {
  return getRequest(data, 'set.platform.list')
}
