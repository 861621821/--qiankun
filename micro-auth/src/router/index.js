import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/app-setting'
  },
  {
    path: '/app-setting',
    name: '应用配置',
    component: () => import(/* webpackChunkName: "page" */ '../views/AppSetting.vue'),
    meta: {
      isMenu: true
    }
  },
  {
    path: '/role',
    name: '角色管理',
    component: () => import(/* webpackChunkName: "role" */ '../views/Role.vue'),
    meta: {
      isMenu: true
    }
  }
]

export default routes
