import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../view/login/Index.vue'
import Layout from '../view/layout/Index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      component: Layout
    }
  ]
})

export default router
