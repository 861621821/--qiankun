<template>
  <div class="role-manage">
    <div class="table-handle-area">
      <el-button icon="el-icon-circle-plus" @click="addRole">添加角色</el-button>
    </div>
    <el-table
      :data="tableData">
      <el-table-column type="expand">
        <template #default="{row}">
          <el-tree
            :data="row.auth"
            :props="props"
            accordion
            >
          </el-tree>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色名"></el-table-column>
      <el-table-column prop="createDate" label="创建日期"></el-table-column>
      <el-table-column prop="editDate" label="修改日期"></el-table-column>
      <el-table-column label="修改">
        <template #default>
          <el-button type="text">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="添加角色"
      v-model="dialogVisible"
      width="400px">
      <el-scrollbar>
        <el-form ref="_form" :model="form" label-width="80px">
          <el-form-item label="角色名">
            <el-input v-model="form.role" placeholder="请输入角色名"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-tree
              :data="appTreeDate"
              :props="props"
              accordion
              show-checkbox
              >
            </el-tree>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive,toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      tableData: [
        {
          role: '开发人员',
          createDate: '2021-05-23',
          editDate: '2021-05-28',
          auth: [
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
            }
          ]
        },
        {role: '测试人员'},
        {role: '运营人员'}
      ],
      appTreeDate: [
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
            },
            {
              name: '员工管理',
              path: '/staff1',
              icon: '',
              type: 1
            },
            {
              name: '员工管理',
              path: '/staff2',
              icon: '',
              type: 1
            },
            {
              name: '员工管理',
              path: '/staff3',
              icon: '',
              type: 1
            },
            {
              name: '员工管理',
              path: '/staff4',
              icon: '',
              type: 1
            },
            {
              name: '员工管理',
              path: '/staff5',
              icon: '',
              type: 1
            },
            {
              name: '员工管理',
              path: '/staff6',
              icon: '',
              type: 1
            },
            {
              name: '员工管理',
              path: '/staff7',
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
      dialogVisible: false,
      form: {
        role: ''
      }
    })

    const addRole = () => {
      state.dialogVisible = true
    }
    return {
      ...toRefs(state),
      addRole
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-tree){
  .el-tree-node__label{
    font-size: 12px;
  }
  .el-dialog__body{
    height: 40vh;
  }
}
</style>
