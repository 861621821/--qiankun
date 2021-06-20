<template>
  <div class="app-setting">
    <div class="apps">
      <div class="title">应用</div>
      <div class="lists">
        <div class="item" @click="handleClickItem(0, item.id)" :class="{active: current[0] === item.id}" v-for="item in apps" :key="item.id">{{item.name}}</div>
        <el-button size="small" plain class="add" icon="el-icon-edit">增加应用</el-button>
      </div>
    </div>
    <div class="level1">
      <div class="title">一级菜单</div>
      <div class="lists">
        <div class="item" @click="handleClickItem(1, item.id)" :class="{active: current[1] === item.id}" v-for="item in menu1List" :key="item.id">{{item.name}}</div>
        <el-button size="small" plain class="add" icon="el-icon-edit">增加一级菜单</el-button>
      </div>
    </div>
    <div class="level2">
      <div class="title">二级菜单</div>
      <div class="lists">
        <div class="item" @click="handleClickItem(2, item.id)" :class="{active: current[2] === item.id}" v-for="item in menu2List" :key="item.id">{{item.name}}</div>
        <el-button size="small" plain class="add" icon="el-icon-edit">增加二级菜单</el-button>
      </div>
    </div>
    <!-- <div class="btn">
      <div class="title">按钮</div>
      <div class="lists">
        <div class="item">菜单1</div>
        <div class="item">菜单1</div>
        <div class="item">菜单1</div>
        <div class="item">菜单1</div>
        <div class="item">菜单1</div>
        <el-button size="small" plain class="add" icon="el-icon-edit">增加应用</el-button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: [],
      apps: [
        {
          id: '001',
          name: '权限应用'
        },
        {
          id: '002',
          name: 'demo应用'
        },
        {
          id: '003',
          name: 'test应用'
        }
      ],
      menu1List: [
        {
          id: '001',
          name: '菜单1'
        },
        {
          id: '002',
          name: '菜单1'
        },
        {
          id: '003',
          name: '菜单1'
        }
      ],
      menu2List: [
        {
          id: '001',
          name: '菜单1'
        },
        {
          id: '002',
          name: '菜单1'
        },
        {
          id: '003',
          name: '菜单1'
        }
      ]
    }
  },
  methods: {
    handleClickItem (i, id) {
      this.$set(this.current, i, id)
      console.log(this.current)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-setting{
  display: flex;
  .apps,.level1,.level2,.btn{
    width: 200px;
    margin: 0 20px;
    padding: 10px;
    background: #F2F3F5;
    border-radius: 4px;
    &:hover .add{
      visibility: unset;
    }
  }
  .title{
    font-weight: bold;
    font-size: 16px;
    color: $main-color;
    margin-bottom: 10px;
    padding: 0 10px;
  }
  .lists{
    text-align: center;
  }
  .item{
    color: $main-color;
    text-align: left;
    height: 32px;
    line-height: 32px;
    border: 1px solid #EAEBEC;
    border-radius: 4px;
    margin: 5px 0;
    padding: 0 10px;
    font-size: 14px;
    background: #fff;
    cursor: pointer;
    position: relative;
    &.active{
      background: #409eff38;
      &::before{
        display: inline-block;
        content: '';
        width: 4px;
        height: 32px;
        background: #18aaff;
        border-radius: 4px 0 0 4px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .add{
    visibility: hidden;
    margin-top: 10px;
  }
  .el-button{
    color: #909090;
  }
  .el-button.is-plain:focus, .el-button.is-plain:hover{
    color: #818080;
    border-color: #c8cbce;
  }
}
</style>
