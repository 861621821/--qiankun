import { createApp } from 'vue'
import './public-path.js'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/inedx'
import routes from './router/index'
import { commonStore } from 'common'
import { initRouter } from './utils'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { ElLoading } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const __qiankun__ = window.__POWERED_BY_QIANKUN__

let instance = null, router = null, subAppPageLoading = null

function render({ routerBase, container } = {}) {
  router = createRouter({
    history: createWebHistory(__qiankun__ ? routerBase : '/'),
    routes
  })

  router.beforeEach((to, from, next) => {
    store.dispatch('global/addRoutesTags', { path: to.path, title: to.meta.title })
    // 添加页面loading
    subAppPageLoading = ElLoading.service({
      target: '.scroll-view'
    })
    next()
  })

  router.afterEach(() => {
    subAppPageLoading.close()
  })

  instance = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus, { size: 'small' })
    .mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行
if(!__qiankun__){
  render()
}

export async function bootstrap() {
  // console.log('%c [auth] app bootstraped', 'color: green;', 123)
}

export async function mount(props) {
  // 注册公共Store 将父应用状态传给子应用
  commonStore.globalRegister(store, props)

  render(props);
  const { asyncSubAppRoutes } = props.getGlobalState()
  initRouter(router, asyncSubAppRoutes)
}

export async function unmount() {
  instance.$destroy?.();
  instance.$el.innerHTML = '';
  instance = null;
}
