import { createStore } from "vuex";

export default createStore({
  state: {
    subAppRoutes: []
  },
  mutations: {
    SET_SUBAPPROUTES(state, payload) {
      state.subAppRoutes = payload;
    }
  },
  actions: {
    setSubAppRoutes({ commit }, payload) {
      commit("SET_SUBAPPROUTES", payload);
    }
  }
});
