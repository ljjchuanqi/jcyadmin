
export default {
  namespaced: true,
  state: {
    // 现在选择的公众号 这应该是一个名字 不是对象
    list: [],
    activeAcid: ''
  },
  getters: {
    /**
     * @description 返回当前的公众号信息 不是一个名字 而是当前激活公众号的所有数据
     * @param {Object} state state
     */
    activeSetting(state) {
      return state.list.find(gzh => gzh.acid === state.activeAcid)
    }
  },
  actions: {
    /**
     * @description 激活一个公众号
     * @param context
     * @param commit
     * @param dispatch
     * @param gzhAcid
     * @returns {Promise<any>}
     */
    set({ state, commit, dispatch }, gzhAcid) {
      return new Promise(async resolve => {
        // 检查这个公众号在公众号列表里是否存在
        // state.activeAcid = state.list.find(e => e.acid === gzhAcid) ? gzhAcid : ''
        state.activeAcid = gzhAcid
        // 持久化
        await dispatch('ldyxb/db/set', {
          dbName: 'database',
          path: '$gzh.activeAcid',
          value: state.activeAcid,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取公众号列表数据
     * @param context
     * @param dispatch
     * @returns {Promise<any>}
     */
    loadList({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值

        let obj = await dispatch('ldyxb/db/get', {
          dbName: 'database',
          path: '$gzh.sourceData',
          defaultValue: {},
          user: true
        }, { root: true })
        state.list = obj.items ? obj.items : []
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据加载公众号设置
     * @param context
     * @param commit
     * @param dispatch
     * @returns {Promise<any>}
     */
    load({ state, commit, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        let activeAcid = await dispatch('ldyxb/db/get', {
          dbName: 'database',
          path: '$gzh.activeAcid',
          defaultValue: '',
          user: true
        }, { root: true })
        state.activeAcid = activeAcid
        // 检查这个公众号在公众号列表里是否存在
        // if (state.list.find(e => e.acid === activeAcid)) {
        //   state.activeAcid = activeAcid
        // } else {
        //   state.activeAcid = ''
        //   // 持久化
        //   await dispatch('ldyxb/db/set', {
        //     dbName: 'sys',
        //     path: 'gzh.activeAcid',
        //     value: state.activeAcid,
        //     user: true
        //   }, { root: true })
        // }

        // end
        resolve()
      })
    }
  },
  mutations: {

  }
}
