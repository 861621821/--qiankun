import Vue from 'vue'
import App from './App.vue'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import router from './router'
import microApps from './micro-app'
import actions from './store'
import http from './utils/http'
import 'nprogress/nprogress.css'
import './style/index.scss'
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Scrollbar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
  Link
} from 'element-ui'

Vue.use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Scrollbar)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Loading)
  .use(Link)
  .use(http)

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

registerMicroApps(apps, {
  beforeLoad: app => {

  },
  beforeMount: [
    app => {
      console.log(app.props)
      actions.setGlobalState({
        subAppLoading: true,
        // 保存当前子系统
        currentAppProps: app.props
      })
    }
  ],
  afterMount: [
    app => {
      actions.setGlobalState({
        subAppLoading: false
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
