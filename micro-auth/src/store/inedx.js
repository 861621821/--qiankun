import { createStore } from 'vuex';

export default createStore({
  state: {
    subAppName: '',
    subAppRoutes: []
  },
  mutations: {
    SET_SUBAPPNAME(state, payload) {
      state.subAppName = payload;
    },
    SET_SUBAPPROUTES(state, payload) {
      state.subAppRoutes = payload;
    }
  },
  actions: {
    setSubAppName({ commit }, payload) {
      commit('SET_SUBAPPNAME', payload);
    },
    setSubAppRoutes({ commit }, payload) {
      commit('SET_SUBAPPROUTES', payload);
    }
  }
});
