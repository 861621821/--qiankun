<template>
  <div class="role-manage">
    <el-table
      :data="tableData">
      <el-table-column
        prop="role"
        label="角色名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="menu"
        label="菜单">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reactive,toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      tableData: [
        {role: '开发人员'},
        {role: '测试人员'},
        {role: '运营人员'}
      ]
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
