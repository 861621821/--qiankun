import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import { commonStore } from 'common'
import { initRouter } from './utils'
import store from './store'
import VueRouter from 'vue-router'
import ElementUI, { Loading } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI, { size: 'medium' })

Vue.config.productionTip = false
let instance = null
let router = null
let subAppPageLoading = null

function render (props = {}) {
  const { container, routerBase } = props
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : '/subapp/micro-demo/',
    mode: 'history',
    routes
  })

  router.beforeEach((to, from, next) => {
    if (to.name) {
      store.dispatch('global/addRoutesTags', { path: to.path, title: to.meta.title })
      // 添加页面loading
      if (!subAppPageLoading) {
        subAppPageLoading = Loading.service({
          target: '.scroll-view'
        })
      }
    }
    next()
  })

  router.afterEach(() => {
    subAppPageLoading && subAppPageLoading.close()
    subAppPageLoading = null
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  // commonStore.globalRegister(store)
  // // 模拟登录后，存储用户信息到global module
  // const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  // store.commit('global/setGlobalState', { user: userInfo })

  render()
}

export async function bootstrap () {
  // console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  // console.log('[vue] props from main framework', props)
  commonStore.globalRegister(store, props)

  render(props)
  const asyncSubAppRoutes = props.getGlobalState('asyncSubAppRoutes')
  initRouter(instance, asyncSubAppRoutes)
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
