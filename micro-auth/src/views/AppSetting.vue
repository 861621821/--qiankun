<template>
  <div class="app-setting">
    <div class="left">
      <div class="module-title">应用树</div>
      <el-tree
        :data="appData"
        :props="props"
        accordion
        draggable
        @node-click="handleNodeClick">
      </el-tree>
      <el-button v-if="showReset">还原</el-button>
    </div>

    <div class="right">
      <div class="module-title">编辑菜单</div>
      <el-form ref="_form" :model="form" label-width="100px">
        <el-form-item label="应用名">
          <el-input v-model="form.name" placeholder="例如：应用配置"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.path" placeholder="例如：/test"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" placeholder="例如：el-icon-s-goods"></el-input>
        </el-form-item>
        <el-form-item label="组件">
          <el-input v-model="form.component" placeholder="例如：Test.vue"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-switch v-model="form.hide" active-color="#13ce66" inactive-color="#dcdfe6"/>
        </el-form-item>
        <el-form-item>
          <el-button plain type="danger">删除</el-button>
          <el-button plain>保存</el-button>
          <el-button plain>{{ form.type === 1 ? '添加二级菜单': '添加菜单'}}</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { reactive,toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      appData: [
        {
          name: '应用配置',
          path: '/micro-auth',
          icon: '',
          type: 0,
          children: [
            {
              name: '应用菜单管理',
              path: '/app-setting',
              icon: '',
              type: 1
            },
            {
              name: '权限管理',
              path: '/auth',
              icon: '',
              type: 1
            },
            {
              name: '员工管理',
              path: '/staff',
              icon: '',
              type: 1
            }
          ]
        },
        {
          name: '示例应用',
          path: '/micro-demo',
          icon: '',
          type: 0,
          children: [
            {
              name: '示例菜单',
              path: '/app-setting',
              icon: '',
              type: 1
            },
            {
              name: '示例菜单',
              path: '/auth',
              icon: '',
              type: 1
            },
            {
              name: '示例菜单',
              path: '/staff',
              icon: '',
              type: 1
            }
          ]
        }
      ],
      props: {
        children: 'children',
        label: 'name'
      },
      form: {
        name: '',
        path: '',
        icon: '',
        component: '',
        hide: false
      },
      showReset: false
    })

    const handleNodeClick = (data) => {
      console.log(data);
      Object.assign(state.form, data)
    }
    return {
      ...toRefs(state),
      handleNodeClick
    }
  }
}
</script>

<style lang="scss" scoped>
.app-setting{
  display: flex;
  height: 100%;
  .left{
    width: 300px;
    border-right: 1px solid #efefef
  }
  .right{
    flex: 1;
    margin-left: 8px;
  }
  .module-title{
    background: #f3f3f3;
    line-height: 32px;
    position: relative;
    padding-left: 8px;
    font-size: 14px;
    font-weight: bold;
    &::before{
      content: '';
      display: inline-block;
      width: 3px;
      height: 16px;
      background: #c3c3c3;
      border-radius: 2px;
      position: absolute;
      top: 8px;
      left: 0;
    }
  }
  .el-tree{
    padding: 20px 5px;
  }
  .el-form{
    flex: 1;
    padding: 20px 5px;
    .el-form-item{
      width: 280px;
      &:last-of-type{
        width: auto;
      }
    }
  }
}
</style>
