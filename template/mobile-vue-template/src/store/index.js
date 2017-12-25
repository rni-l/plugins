// vuex
import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    test: 1
  },
  mutations: {
    updateTest(state, value) {
      state.test = value
    }
  },
  modules: {
    user
  },
  strict: debug
})
