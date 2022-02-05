<!--
 * @Author: your name
 * @Date: 2021-12-14 19:53:31
 * @LastEditTime: 2022-02-05 11:50:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\views\permission\log\log.vue
-->
<template>
  <div class="app-container">
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <el-input v-model="query.filter" clearable size="small" placeholder="全表模糊搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation />
      </div>
      <!-- <crudOperation>
        <el-button
          slot="left"
          class="filter-item"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :loading="delLoading"
          :disabled="crud.selections.length === 0"
          @click="doDelete(crud.selections)"
        >
          强退
        </el-button>
      </crudOperation> -->
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="userName" label="用户名" />
      <!-- <el-table-column prop="nickName" label="用户昵称" /> -->
      <!-- <el-table-column prop="dept" label="部门" /> -->
      <el-table-column prop="ip" label="登录IP" />
      <el-table-column :show-overflow-tooltip="true" prop="address" label="登录地点" />
      <!-- <el-table-column prop="browser" label="浏览器" /> -->
      <el-table-column prop="loginTime" label="登录时间" />
    </el-table>
    <!--分页组件-->
    <pagination />
  </div>
</template>

<script>
// import { del } from '@/api/monitor/online'
// import CRUD, { presenter, header, crud } from '@crud/crud'
// import rrOperation from '@crud/RR.operation'
// import crudOperation from '@crud/CRUD.operation'
// import pagination from '@crud/Pagination'

export default {
//   name: 'OnlineUser',
//   components: { pagination, crudOperation, rrOperation },
//   cruds() {
//     return CRUD({ url: 'auth/online', title: '在线用户' })
//   },
//   mixins: [presenter(), header(), crud()],
//   data() {
//     return {
//       delLoading: false,
//       permission: {}
//     }
//   },
//   created() {
//     this.crud.msg.del = '强退成功！'
//     this.crud.optShow = {
//       add: false,
//       edit: false,
//       del: false,
//       download: true
//     }
//   },
//   methods: {
//     doDelete(datas) {
//       this.$confirm(`确认强退选中的${datas.length}个用户?`, '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: 'warning'
//       }).then(() => {
//         this.delMethod(datas)
//       }).catch(() => {})
//     },
//     // 踢出用户
//     delMethod(key, index) {
//       const ids = []
//       if (key instanceof Array) {
//         key.forEach(val => {
//           ids.push(val.key)
//         })
//       } else ids.push(key)
//       this.delLoading = true
//       del(ids).then(() => {
//         this.delLoading = false
//         if (this.$refs[index]) {
//           this.$refs[index].doClose()
//         }
//         this.crud.dleChangePage(1)
//         this.crud.delSuccessNotify()
//         this.crud.toQuery()
//       }).catch(() => {
//         this.delLoading = false
//         if (this.$refs[index]) {
//           this.$refs[index].doClose()
//         }
//       })
//     }
//   }
}
</script>
