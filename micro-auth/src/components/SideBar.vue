<template>
  <div class="subapp-menu-wrapper">
    <div class="subapp-name">{{ subAppName }}</div>
    <el-menu router :default-active="active">
      <el-menu-item :index="item.path" v-for="item in routes" :key="item.id">
        <template #title>
          <i :class="item.icon || 'el-icon-warning'"></i>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const state = reactive({
      active: ''
    })
    const store = useStore()
    const route = useRoute()
    const { value: currentAppProps } = computed(() => store.state.global.currentAppProps)
    const subAppName = currentAppProps.name
    const { asyncSubAppRoutes } = currentAppProps.getGlobalState()
    const routes = (() => {
      const sortedRoutes = asyncSubAppRoutes.sort((a, b) => a.sort - b.sort)
      return sortedRoutes.filter(e => e.isMenu)
    })()

    watch(() => route.path, (n) => {
      state.active = n
    })

    return {
      ...toRefs(state),
      subAppName,
      routes
    }
  }
}
</script>

<style lang="scss" scoped>
.subapp-menu-wrapper{
  width: 226px;
  background: #fff;
  .subapp-name{
    font-size: 14px;
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    background: #F9FAFC;
    font-weight: bold;
    position: relative;
    &::before{
      display: inline-block;
      content: '';
      background: #fdcd33;
      width: 3px;
      height: 16px;
      border-radius: 2px;
      position: absolute;
      left: 0;
      top: 16px;
    }
  }
  .el-menu{
    border-right: unset;
    color: $main-color;
    :deep(.el-menu-item){
      &.is-active{
        color: $main-color;
        background: #f0f0f0;
      }
      &:focus, &:hover{
        background: #f0f0f0;
      }
    }
  }
}
</style>