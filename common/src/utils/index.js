// export default {
//   // 初始化路由
//   initRouter: ({ addRoute, push }, asyncRoutes) => {
//     const sortedRoutes = asyncRoutes.sort((a, b) => a.sort - b.sort)
//     let defaultPath
//     sortedRoutes.map((e, i) => {
//       // 默认打开第一个菜单
//       if(i === 0){
//         defaultPath = e.path
//       }
//       const route = {
//         path: e.path,
//         component: () => import(`@/views/${e.component}`),
//         meta: { title: e.title }
//       }
//       addRoute(route)
//     })
//     push(defaultPath)
//   }
// }
