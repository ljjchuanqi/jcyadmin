import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    isForwardFormVisble: false,
    isQuantumTimeEditVisble: false,
    forwardForm: {}// 预约表单
  },
  getters: {
    getForwardForm(state) {
      return state.forwardForm
    }
  },
  mutations: {
    /**
     * @description 保存预约表单的数据
     * @param {Object} state state
     * @param {Boolean} val data
     */
    saveForwardForm(state, val) {
      if (_.isEmpty(val)) { // 是否是空对象
        var obj = {
          type: 1,
          start_date: '',
          end_date: '',
          space_date: '',
          select_weekday: [],
          rules: []
        }
        state.forwardForm = obj
        // debugger
      } else {
        state.forwardForm = val
      }
    },
    /**
     * @description 设置forward-form的开启/隐藏状态
     * @param {Object} state state
     * @param {Boolean} val data
     */
    toggleForwardForm(state, val) {
      state.isForwardFormVisble = val
    },
    /**
     * @description 设置quantum-time-edit的开启/隐藏状态
     * @param {Object} state state
     * @param {Boolean} val data
     */
    toggleQuantumTimeEdit(state, val) {
      state.isQuantumTimeEditVisble = val
    }
  },
  actions: {

  }
}
