<template>
  <div class="auth-app">
    <side-bar/>
    <div class="sub-app-wrapper">
      <tags-view/>
      <div class="sub-app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import SideBar from './components/SideBar.vue'
import TagsView from './components/TagsView.vue'
export default {
  name: 'App',
  components: {
    SideBar,
    TagsView
  },
  setup () {
    onMounted(() => {
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

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.28s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.auth-app{
  display: flex;
  height: 100%;
  .sub-app-wrapper{
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  .sub-app-main{
    background: #fff;
    flex: 1;
    padding: 15px;
  }
}
</style>
