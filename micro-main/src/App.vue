<template>
  <div class="layout-wrapper">
    <lySide></lySide>
    <div class="main-wrapper">
      <ly-header/>
      <el-scrollbar>
        <div id="subapp-viewport"></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import microApps from './micro-app'
import lySide from './components/LySider.vue'
import lyHeader from './components/LyHeader.vue'
export default {
  name: 'App',
  components: {
    lySide, lyHeader
  },
  data () {
    return {
      isLoading: true,
      microApps
    }
  },
  computed: {
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  methods: {
    goto (item) {
      history.pushState(null, item.activeRule, item.activeRule)
      this.current = item.name
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
        this.current = path
      }
    },
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
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  mounted () {
    this.listenRouterChange()
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html, body{
  margin: 0!important;
  padding: 0;
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
  .el-scrollbar{
    flex: 1;
    height: 100%;
    margin: 15px;
    overflow: hidden;
    border-radius: 5px;
    .el-scrollbar__wrap{
      overflow-x: hidden;
    }
    .el-scrollbar__view,#subapp-viewport{
      height: 100%;
      &>div{
        height: 100%;
      }
    }
  }
}
</style>
