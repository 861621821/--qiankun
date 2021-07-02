// import axios from 'axios'

export default {
  // 获取菜单
  fetchMenu () {
    // return axios.get('/test')
    // const dev = process.env.NODE_ENV === 'dev'
    return new Promise((resolve, reject) => {
      resolve({
        code: 200,
        data: [
          {
            path: '/demo',
            title: '客户',
            appId: '002',
            icon: 'el-icon-user-solid',
            menu: [
              {
                path: '/customer',
                title: '客户管理',
                id: '002001',
                pid: '002',
                icon: 'https://image.01lb.com.cn//uploads/wecom/21/0617/1623919611K717Ftr2.png',
                component: 'customer/Index.vue',
                isMenu: true,
                sort: 1
              },
              {
                path: '/task',
                title: '任务宝',
                id: '002002',
                pid: '002',
                component: 'task/Index.vue',
                isMenu: true,
                sort: 2
              }
            ]
          },
          {
            path: '/auth',
            title: '应用',
            icon: 'el-icon-set-up',
            id: '001',
            menu: [
              {
                path: '/app-setting',
                title: '应用配置',
                icon: 'el-icon-setting',
                id: '001001',
                pid: '001',
                component: 'AppSetting.vue',
                isMenu: true,
                sort: 1
              },
              {
                path: '/role',
                title: '角色管理',
                icon: 'el-icon-s-operation',
                id: '001002',
                pid: '001',
                component: 'Role.vue',
                isMenu: true,
                sort: 2
              },
              {
                path: '/staff',
                title: '员工管理',
                icon: 'el-icon-user',
                id: '001003',
                pid: '001',
                component: 'Staff.vue',
                isMenu: true,
                sort: 3
              }
            ]
          }
        ]
      })
    })
  }
}
