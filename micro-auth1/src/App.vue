<template>
  <div id="app">
    <side-bar/>
    <div class="app-wrapper">
      <tab-bar/>
      <div class="app-main-wrapper">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { commonComponents } from './common/src/index'
export default {
  components: {
    SideBar: commonComponents.SideBar,
    TabBar: commonComponents.TabBar
  },
  computed: {
    // subAppRoutes () {
    //   return this.$store.state.global.asyncSubAppRoutes
    // }
  },
  mounted () {
    // console.log(this.subAppRoutes)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
  display: flex;
  .app-wrapper{
    flex: 1;
    display: flex;
    flex-direction: column;
    .app-main-wrapper{
      flex: 1;
      padding: 0 20px;
    }
  }
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
