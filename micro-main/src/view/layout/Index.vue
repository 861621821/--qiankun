<template>
  <div class="layout-wrapper">
    <lySide></lySide>
    <div class="main-wrapper">
      <ly-header/>
      <div
        id="subapp-viewport"
        v-loading="globalState.subAppLoading"
        element-loading-text="进入子系统..."
        element-loading-spinner="lyloading"
        element-loading-background="hsla(0,0%,100%,.8)">
      </div>
    </div>
  </div>
</template>

<script>
import lySide from './LySider.vue'
import lyHeader from './LyHeader.vue'
import actions from '../../store'

export default {
  name: 'App',
  components: {
    lySide, lyHeader
  },
  data () {
    return {
      subAppRoutes: []
    }
  },
  computed: {
    globalState () {
      return actions.getGlobalState()
    },
    currentRouterBase () {
      return actions.getGlobalState('currentAppProps').routerBase
    }
  },
  watch: {
    currentRouterBase (n) {
      this.globalState.asyncApps.map(e => {
        if (e.path === n) {
          actions.setGlobalState({
            asyncSubAppRoutes: e.menu
          })
        }
      })
    }
  },
  mounted () {
    this.listenRouterChange()
  },
  methods: {
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html, body{
  font-size: 14px;
}
.layout-wrapper{
  overflow: hidden;
  display: flex;
  .side-wrapper{
    height: 100vh;
    width: 64px;
    z-index: 999;
  }
  .main-wrapper{
    flex: 1;
    height: 100vh;
    background: #F2F3F5;
    display: flex;
    flex-direction: column;
  }
  #subapp-viewport{
    flex: 1;
    height: 100%;
    margin: 15px;
    overflow: hidden;
    border-radius: 5px;
    &>div{
      height: 100%;
    }
  }
}
</style>
