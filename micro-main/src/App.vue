<template>
  <router-view />
</template>

<script>
import NProgress from 'nprogress'
export default {
  name: 'App',
  data () {
    return {
      isLoading: true
    }
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
  created () {
    NProgress.start()
  }
}
</script>
