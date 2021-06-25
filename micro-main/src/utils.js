// import axios from 'axios'

export default {
  // 获取菜单
  fetchMenu () {
    // return axios.get('/test')
    return new Promise((resolve, reject) => {
      resolve({
        code: 200,
        data: [
          {
            path: '/micro-auth',
            title: '应用',
            icon: 'el-icon-set-up',
            id: '001',
            menu: [
              {
                path: '/app-setting',
                title: '应用配置',
                icon: 'el-icon-s-grid',
                id: '001001',
                pid: '001',
                component: 'AppSetting.vue',
                isMenu: true,
                sort: 1
              },
              {
                path: '/role',
                title: '角色管理',
                icon: 'el-icon-s-custom',
                id: '001002',
                pid: '001',
                component: 'Role.vue',
                isMenu: true,
                sort: 2
              },
              {
                path: '/staff',
                title: '员工管理',
                icon: 'el-icon-user-solid',
                id: '001003',
                pid: '001',
                component: 'Role.vue',
                isMenu: true,
                sort: 3
              }
            ]
          },
          {
            path: '/micro-demo',
            title: '客户',
            appId: '002',
            icon: 'el-icon-user-solid',
            menu: [
              {
                path: '/customer',
                title: '客户管理',
                id: '002001',
                pid: '002',
                component: 'Customer.vue',
                isMenu: true,
                sort: 1
              },
              {
                path: '/role',
                title: '任务宝',
                id: '002002',
                pid: '002',
                component: 'Role.vue',
                isMenu: true,
                sort: 2
              }
            ]
          }
        ]
      })
    })
  }
}
