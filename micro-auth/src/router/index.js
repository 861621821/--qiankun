const routes = [
  {
    path: '/',
    redirect: '/app-setting'
  },
  {
    path: '/app-setting',
    name: 'app-setting',
    component: () => import('../views/AppSetting.vue')
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('../views/Role.vue')
  }
];

export default routes