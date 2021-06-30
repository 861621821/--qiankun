<template>
  <el-menu class="side-wrapper" :default-active="active" router>
    <logo/>
    <el-menu-item :index="item.path" v-for="item in apps" :key="item.path">
      <i :class="item.icon || 'el-icon-menu'"></i>
      <span slot="title">{{item.title}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import actions from '../../store'
import logo from './LyLogo'
import utils from '../../utils'
import { setDefaultMountApp } from 'qiankun'
export default {
  components: {
    logo
  },
  props: ['routes', 'active'],
  data () {
    return {
      apps: []
    }
  },
  mounted () {
    this.initMenu()
  },
  methods: {
    initMenu () {
      utils.fetchMenu().then(res => {
        // 默认访问第一个子应用
        setDefaultMountApp(res?.data[0].path)
        res.data.map(e => {
          this.apps = res.data
        })
        actions.setGlobalState({
          asyncApps: res.data
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.side-wrapper{
  background: #081632;
  text-align: center;
  ::v-deep{
    .logo{
      margin: 10px 0 20px 0;
    }
  }
  .el-menu-item{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 4px 0!important;
    height: 60px;
    line-height: unset;
    margin-bottom: 15px;
    color: rgba(255, 255, 255, 0.65);
    &.is-active,&:focus,&:hover{
      background: rgba(231, 234, 255, 0.12);
      color: #fff;
      i{
        color: #fff;
      }
    }
    & [class^=el-icon-]{
      font-size: 20px;
    }
  }
}
</style>
