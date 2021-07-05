<template>
  <div class="subapp-wrapper">
    <side-bar/>
    <div class="sub-app-wrapper">
      <tags-view/>
      <el-scrollbar class="scroll-view">
        <div class="sub-app-main">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </transition>
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
.fade-transform-enter-active, .fade-transform-leave-active {
  transition: all .28s;
}
.fade-transform-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.fade-transform-leave-to {
  transform: translateX(10px);
  opacity: 0;
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
