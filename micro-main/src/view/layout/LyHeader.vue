<template>
  <div class="header-wrapper">
    <div class="company-name">
      <el-dropdown @command="handleCommandClick">
        <span class="el-dropdown-link">
          零一创造欢乐(深圳)科技有限公司<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="switch">切换企业</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleCommandClick (command) {
      switch (command) {
        case 'switch':

          break
        case 'logout':
          localStorage.clear()
          this.$router.push('/login')
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper{
  padding: 0 20px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0 5px #f1f1f1;
  height: 48px;
  line-height: 48px;
  width: 100%;
  z-index: 1;
  .apps-list{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .sub-item{
    list-style: none;
    display: inline-block;
    cursor: pointer;
    margin: 0 10px;
  }
  .company-name{
    font-size: 14px;
    float: right;
  }
}
</style>
