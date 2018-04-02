// vuex
import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    isLogin: false,
    isRequestError: false,
    test: 1,
    environment: ''
  },
  mutations: {
    updateTest(state, value) {
      state.test = value
    },
    updateLogin(state, value) {
      state.isLogin = value
    },
    updateRequestError(state, value) {
      state.isRequestError = value
    },
    updateEnvironment(state, value) {
      state.environment = value
    }
  },
  modules: {
    user
  },
  strict: debug
})
