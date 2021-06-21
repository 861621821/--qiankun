<template>
  <div class="subapp-menu-wrapper">
    <div class="subapp-name">{{ subAppName }}</div>
    <el-menu router default-active="2">
      <el-menu-item :index="item.path" v-for="item in subAppRoutes" :key="item.id">
        <template #title>
          <i class="el-icon-location"></i>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const subAppName = computed(() => store.state.subAppName)
    const subAppRoutes = computed(() => store.state.subAppRoutes)
    console.log(store.state);
    return {
      subAppName,
      subAppRoutes
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
    ::v-deep{
      .el-menu-item.is-active{
        background: #f0f0f0;
        color: $main-color
      }
      .el-menu-item:focus, .el-menu-item:hover{
        background: #f0f0f0;
      }
    }
  }
}
</style>