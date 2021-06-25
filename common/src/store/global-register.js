/**
 * @param {vuex实例} store 
 * @param {qiankun下发的props} props 
 */
function registerGlobalModule (store, props = {}) {
  console.log(store,props);
  if (!store || !store.hasModule) {
    return;
  }

  // 获取初始化的state
  const initState = props.getGlobalState && props.getGlobalState()
  // 将父应用的数据存储到子应用中，命名空间固定为global
  if (!store.hasModule('global')) {
    const globalModule = {
      namespaced: true,
      state: {
        ...initState,
        routesTags: {}, // 存放打开过的页面
      },
      mutations: {
        SET_GLOBALSTATE (state, payload) {
          state = Object.assign(state, payload);
          // 通知父应用
          props.setGlobalState(state)
        },
        ADD_ROUTESTAGS(state, {path, title}){
          state.routesTags[path] = title
        },
        REMOVE_ROUTESTAGS(state, path){
          delete state.routesTags[path]
        }
      },
      actions: {
        // 子应用改变state并通知父应用
        setGlobalState ({ commit }, payload) {
          commit('SET_GLOBALSTATE', payload);
        },
        // 初始化，只用于mount时同步父应用的数据
        initGlobalState ({ commit }, payload) {
          commit('SET_GLOBALSTATE', payload);
        },
        // 记录每次访问的页面
        addRoutesTags({ commit }, payload){
          commit('ADD_ROUTESTAGS', payload)
        },
        // 删除页面记录
        removeRoutesTags({ commit }, payload){
          commit('REMOVE_ROUTESTAGS', payload)
        },
      }
    };
    store.registerModule('global', globalModule);
  } else {
    // 每次mount时，都同步一次父应用数据
    store.dispatch('global/initGlobalState', initState);
  }
};

export default registerGlobalModule;
