import { createApp } from 'vue'
import './public-path.js'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/inedx'
import routes from './router/index'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const __qiankun__ = window.__POWERED_BY_QIANKUN__

let instance = null

function render({ routerBase, container } = {}) {
  const router = createRouter({
    history: createWebHistory(__qiankun__ ? routerBase : '/'),
    routes
  });
  instance = createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
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
  // 获取子应用name
  store.dispatch('setSubAppName', props.name);
  // 从主应用获取子应用路由
  props.onGlobalStateChange(({ asyncSubAppRoutes }) => {
    store.dispatch('setSubAppRoutes', asyncSubAppRoutes);
  });

  // common.store.globalRegister(store, props)

  render(props);
}

export async function unmount() {
  instance.$destroy?.();
  instance.$el.innerHTML = '';
  instance = null;
}
