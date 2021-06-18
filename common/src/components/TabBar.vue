<template>
  <div class="tab-bar">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep{
  .el-tabs__nav{
    padding: 0 10px;
  }
  .el-tabs__nav-wrap::after{
    height: 1px;
  }
  .el-tabs__item{
    height: 48px;
    line-height: 48px;
  }
}
</style>
