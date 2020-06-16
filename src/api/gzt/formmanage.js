import request from '@/utils/request'

/**
 * 工作台表单管理-地址管理列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getSceneList(data) {
  return request({
    url: '/admins/mform/Mform',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加工作台表单管理-地址
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addScene(data) {
  return request({
    url: '/admins/mform/Mform',
    method: 'post',
    params: {},
    data

  })
}

/**
 * 修改工作台表单管理-地址
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function editScene(data) {
  return request({
    url: '/admins/mform/Mform/' + data.id,
    method: 'post',
    params: {},
    data
  })
}

/**
 * 删除工作台表单管理-
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delScene(data) {
  return request({
    url: '/admins/mform/Mform?id=' + data,
    method: 'delete',
    params: {}

  })
}
/**
 * 获取数据模型详情
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getDetail(data) {
  return request({
    url: '/admins/mform/Mform/' + data,
    method: 'get',
    params: {}
  })
}
/**
 * 获取历史表单数据详情
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getHistoryDetail(data) {
  return request({
    url: '/admins/mform/MformPost/' + data,
    method: 'get',
    params: {}
  })
}
/**
 * 工作台表单管理-提交列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getHistoryList(data) {
  return request({
    url: '/admins/mform/MformPost',
    method: 'get',
    params: { ...data }

  })
}

/**
 * 删除工作台表单管理 提交列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function delHistory(data) {
  return request({
    url: '/admins/mform/MformPost?id=' + data,
    method: 'delete',
    params: {}

  })
}
/**
 * 导出表单列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getExportList(data) {
  return request({
    url: '/admins/mform/MformExport',
    method: 'get',
    params: { ...data }

  })
}
/**
 * 增加导出表单列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addExport(data) {
  return request({
    url: '/admins/mform/MformExport',
    method: 'post',
    params: {},
    data

  })
}
/**
 * 表单审核
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function formAudit(data) {
  return request({
    url: '/admins/mform/MformPost/audit',
    method: 'post',
    params: {},
    data

  })
}
/**
 * 表单审核
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function formSelectsAudit(data) {
  return request({
    url: '/admins/mform/MformPost/pass',
    method: 'post',
    params: {},
    data
  })
}
/**
 * 工作台表单管理-注册表单管理
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getRegisterList(data) {
  return request({
    url: '/admins/user/UserMform/UserMform',
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
    params: { acid: data.acid }

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
