/*eslint-disable*/
const state = {
  // 用户类型
  userType: 'user'
}

// getters
const getters = {
  getUserType: state => state.userType
}

// actions
const actions = {
  // setUserType ({ commit }) {
  //   commit('setUserType')
  // }
}

// mutations
const mutations = {
  setUserType (state, { value }) {
    console.log(value)
    state.userType = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}