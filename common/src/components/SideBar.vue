<template>
  <div class="subapp-menu-wrapper">
    <div class="subapp-name">{{ currentAppProps.name }}</div>
    <el-menu class="side-menu" :default-active="defaultActive" router>
      <el-menu-item :index="appRootPath + item.path" v-for="item in appRoutes" :key="item.id">
        <el-avatar :size="40" :src="item.icon"></el-avatar>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subAppName: '', // 子应用名
      appRootPath: '', // 子应用跟路径
      defaultActive: this.$route.path
    }
  },
  computed: {
    currentAppProps(){
      return this.$store.state.global.currentAppProps
    },
    path () {
      return this.$route.path
    },
    appRoutes () {
      return this.$store.state.global.asyncSubAppRoutes
    }
  },
  watch: {
    '$route.path'(path){
      this.defaultActive = path
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
    color: #4C4D57;
    ::v-deep{
      .el-menu-item{
        &.is-active{
          color: #4C4D57;
          background: #f0f0f0!important;
        }
        &:focus{
          background: #f0f0f0;
        }
        &:hover{
          background: #fff;
        }
      }
    }
    .el-menu-item, .el-submenu__title{
      height: 72px;
      line-height: 72px;
    }
    .el-avatar{
      margin-right: 10px;
    }
  }
}
</style>
