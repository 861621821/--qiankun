<template>
  <div></div>
</template>

<script>
import { Loading } from 'element-ui'
import initMenu from '@/common/initMenu'
export default {
  name: 'loading',
  data () {
    return {
      loading: null
    }
  },
  created () {
    this.loading = Loading.service({
      lock: true,
      spinner: 'lyloading',
      background: 'hsla(0,0%,100%,.8)'
    })
    initMenu()
  },
  beforeRouteLeave (to, from, next) {
    this.loading.close()
    next()
  }
}
</script>
