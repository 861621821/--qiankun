<template>
  <div class="app-setting">
    <el-tree
      :data="appData"
      :props="props"
      accordion
      draggable
      @node-click="handleNodeClick">
    </el-tree>
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
        <el-button plain>添加子集</el-button>
      </el-form-item>
    </el-form>
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
          children: [
            {
              name: '应用菜单管理',
              path: '/app-setting',
              icon: ''
            },
            {
              name: '权限管理',
              path: '/auth',
              icon: ''
            },
            {
              name: '员工管理',
              path: '/staff',
              icon: ''
            }
          ]
        },
        {
          name: '示例应用',
          path: '/micro-demo',
          icon: '',
          children: [
            {
              name: '示例菜单',
              path: '/app-setting',
              icon: ''
            },
            {
              name: '示例菜单',
              path: '/auth',
              icon: ''
            },
            {
              name: '示例菜单',
              path: '/staff',
              icon: ''
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
      }
    })

    const handleNodeClick = (data) => {
      console.log(data);
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
  .el-tree{
    width: 300px;
    border-right: 1px solid #efefef
  }
  .el-form{
    flex: 1;
    .el-form-item{
      width: 280px;
      &:last-of-type{
        width: auto;
      }
    }
  }
}
</style>
