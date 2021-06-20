<template>
  <div class="auth-app">
    <side-bar/>
    <div class="sub-app-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import SideBar from './components/SideBar.vue'
export default {
  'name': 'App',
  'components': {
    SideBar
  },
  setup () {
    // const router = useRouter();
    onMounted(() => {
      // console.log(router)
    })
  }
}
</script>

<style lang="scss">
html, body{
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  color: #2c3e50;
  height: 100%;
}
.auth-app{
  display: flex;
  .el-menu{
    width: 226px;
  }
  .sub-app-wrapper{
    flex: 1;
    padding: 15px;
  }
}
</style>
