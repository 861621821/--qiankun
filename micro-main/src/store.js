import { initGlobalState } from 'qiankun'
import Vue from 'vue'

// 父应用的初始state
// Vue.observable是为了让initialState变成可响应：https://cn.vuejs.org/v2/api/#Vue-observable。
const initialState = Vue.observable({
  subAppLoading: false, // 子系统加载状态
  currentAppProps: {}, // 当前子系统
  asyncApps: [], // 通过接口请求回来的所有系统数据
  asyncSubAppRoutes: [], // 当前子系统菜单
  routesTags: []
})
const actions = initGlobalState(initialState)

actions.onGlobalStateChange((newState, prev) => {
  // console.log('GlobalStateChange', newState, prev)
  for (const key in newState) {
    initialState[key] = newState[key]
  }
})

// 定义一个获取state的方法下发到子应用
actions.getGlobalState = (key) => {
  return key ? initialState[key] : initialState
}

export default actions
