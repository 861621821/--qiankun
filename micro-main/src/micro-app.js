import store from './store'

const microApps = [
  {
    name: 'micro-test',
    entry: process.env.VUE_APP_SUB_TEST,
    activeRule: '/micro-test'
  },
  {
    name: 'micro-demo',
    entry: process.env.VUE_APP_SUB_DEMO,
    activeRule: '/micro-demo'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
