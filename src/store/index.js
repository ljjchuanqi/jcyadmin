import Vue from 'vue'
import Vuex from 'vuex'

import ldyxb from './modules/ldyxb'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ldyxb
  }
})
