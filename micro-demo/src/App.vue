<template>
  <div class="subapp-wrapper">
    <side-bar/>
    <div class="sub-app-wrapper">
      <tags-view/>
      <el-scrollbar class="scroll-view">
        <div class="sub-app-main">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { commonComponents } from 'common'
export default {
  components: {
    SideBar: commonComponents.SideBar,
    TagsView: commonComponents.TagsView
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#app {
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

.subapp-wrapper{
  display: flex;
  height: 100%;
  .sub-app-wrapper{
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    &>.el-scrollbar{
      background: #fff;
      height: 100%;
    }
  }
  .sub-app-main{
    flex: 1;
    padding: 15px;
  }
}
</style>
