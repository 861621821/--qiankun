import Vue from 'vue'
import App from './App.vue'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import router from './router'
import microApps from './micro-app'
import actions from './store'
import 'nprogress/nprogress.css'
// import { store as commonStore } from 'common'
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Scrollbar,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Scrollbar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.config.productionTip = false

const instance = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader (loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading
  }
}

// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item,
    loader
  }
})

// 监听全局状态获取所有子应用
let asyncApp = []
actions.onGlobalStateChange(({ asyncApps }) => {
  asyncApp = asyncApps
})

registerMicroApps(apps, {
  beforeLoad: app => {
    // console.log('before load app.name====>>>>>', app.name)
  },
  beforeMount: [
    app => {
      // console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
    }
  ],
  afterMount: [
    app => {
      // console.log('%c [主应用after mount]', 'color: green;')
      asyncApp.map(e => {
        if (e.path === app.props.routerBase) {
          actions.setGlobalState({
            asyncSubAppRoutes: e.menu
          })
        }
      })
    }
  ],
  afterUnmount: [
    app => {
      // console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    }
  ]
})
setDefaultMountApp('/micro-auth')
start()
