import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    subAppRoutes: []
  },
  mutations: {
    SET_SUBAPPROUTES (state, payload) {
      state.subAppRoutes = payload
    }
  },
  actions: {
    setSubAppRoutes ({ commit }, payload) {
      commit('SET_SUBAPPROUTES', payload)
    }
  }
})
