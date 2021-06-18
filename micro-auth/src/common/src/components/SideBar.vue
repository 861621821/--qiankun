<template>
  <div class="subapp-menu-wrapper">
    <div class="subapp-name">{{appName}}</div>
    <el-menu class="side-menu" :default-active="defaultActive" router>
      <el-menu-item :index="appRootPath + item.path" v-for="item in appRoutes" :key="item.id">
        <i :class="item.icon || 'el-icon-menu'"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      appName: '', // 子应用名
      appRootPath: '', // 子应用跟路径
      defaultActive: this.$route.path
    }
  },
  computed: {
    path () {
      return this.$route.path
    },
    appRoutes () {
      return this.$store.state.subAppRoutes
    }
  },
}
</script>

<style lang="scss" scoped>
.subapp-menu-wrapper{
  width: 226px;
  box-shadow: 2px 0px 6px 0px rgb(51 51 51 / 15%);
  .el-menu{
    border-right: unset;
  }
}
.el-menu-item.is-active{
  background: #f0f0f0;
  color: #303133;
}
.subapp-name{
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  color: #595959;
  padding-left: 20px;
}
</style>
