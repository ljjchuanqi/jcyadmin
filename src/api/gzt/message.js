import request from '@/utils/request'

/**
 * 获取短信模板列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getMessageList(data) {
  return request({
    url: '/admins/sms/Template',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 获取短信模板历史记录
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getHistoryList(data) {
  return request({
    url: '/admins/sms/SmsRecord',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 新增短信模板
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addSmsTemplate(data) {
  return request({
    url: '/admins/sms/Template',
    method: 'post',
    params: {},
    data

  })
}
/**
 * 删除短信模板
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delSmsTemplate(data) {
  return request({
    url: '/admins/sms/Template/' + data.id,
    method: 'delete',
    params: {}

  })
}
/**
 * 更新短信模板
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editSmsTemplate(data) {
  return request({
    url: '/admins/sms/Template/' + data.id,
    method: 'post',
    params: {},
    data
  })
}
/**
 * 获取短信模板详情
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSmsTemplateDetail(data) {
  return request({
    url: '/admins/sms/Template/' + data.id,
    method: 'get',
    params: {}
  })
}
