import request from '@/utils/request'

/**
 * 添加一个专题
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addTopicItem(data) {
  return request({
    url: '/v3/topic',
    method: 'post',
    params: {
      method: 'add.topic.item'
    },
    data
  })
}

/**
 * 编辑一个专题
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setTopicItem(data) {
  return request({
    url: '/v3/topic',
    method: 'post',
    params: {
      method: 'set.topic.item'
    },
    data
  })
}

/**
 * 批量删除专题
 * @param {Array} topic_id
 * @returns {AxiosPromise}
 */
export function delTopicList(topic_id) {
  return request({
    url: '/v3/topic',
    method: 'post',
    params: {
      method: 'del.topic.list'
    },
    data: {
      topic_id
    }
  })
}

/**
 * 获取一个专题
 * @param {Number} topic_id
 * @returns {AxiosPromise}
 */
export function getTopicItem(topic_id) {
  return request({
    url: '/v3/topic',
    method: 'post',
    params: {
      method: 'get.topic.item'
    },
    data: {
      topic_id
    }
  })
}

/**
 * 获取专题列表
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function getTopicList(data) {
  return request({
    url: '/v3/topic',
    method: 'post',
    params: {
      method: 'get.topic.list'
    },
    data
  })
}

/**
 * 批量设置专题是否显示
 * @param {Array} topic_id
 * @param {Number} status
 * @returns {AxiosPromise}
 */
export function setTopicStatus(topic_id, status) {
  return request({
    url: '/v3/topic',
    method: 'post',
    params: {
      method: 'set.topic.status'
    },
    data: {
      topic_id,
      status
    }
  })
}
