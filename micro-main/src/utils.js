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
            name: '权限',
            icon: 'el-icon-set-up',
            id: '001',
            menu: [
              {
                path: '/app-setting',
                name: '应用配置',
                id: '001001',
                pid: '001',
                component: 'Page',
                isMenu: true,
                sort: 1
              },
              {
                path: '/role',
                name: '角色管理',
                id: '001002',
                pid: '001',
                component: 'Role',
                isMenu: true,
                sort: 2
              },
              {
                path: '/staff',
                name: '员工管理',
                id: '001003',
                pid: '001',
                component: 'Role',
                isMenu: true,
                sort: 2
              }
            ]
          },
          {
            path: '/micro-demo',
            name: '客户',
            appId: '002',
            icon: 'el-icon-user-solid',
            menu: [
              {
                path: '/customer',
                name: '客户管理',
                id: '002001',
                pid: '002',
                component: 'Customer',
                isMenu: true,
                sort: 1
              },
              {
                path: '/role',
                name: '任务宝',
                id: '002002',
                pid: '002',
                component: 'Role',
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
