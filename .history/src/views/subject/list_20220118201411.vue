<!--
 * @Author: your name
 * @Date: 2022-01-18 17:40:48
 * @LastEditTime: 2022-01-18 20:14:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\views\subject\list.vue
-->
<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

    <el-table
      :data="data2"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :expand-row-keys="expandRow"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- default-expand-all -->
      <el-table-column prop="name" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="path" label="访问路径" sortable width="180">
      </el-table-column>
      <el-table-column prop="component" label="组件路径" sortable width="180">
      </el-table-column>
      <el-table-column prop="permissionValue" label="权限值"> </el-table-column>
      <el-table-column
        prop="typeName"
        label="类型"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="() => updateFunction(scope.row)"
            >修改功能
          </el-button>

          <el-button 
          type="text" size="mini" @click="() => remove(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import subject from '@/api/subject/subject'
export default {

  data() {
    return {
      filterText: '',
      data2: [],  //返回所有分类数据
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
      this.getAllSubjectList()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    getAllSubjectList() {
        subject.getSubjectList()
            .then(response => {
                // console.log("data2: ",response.data.data)
                this.data2 = response.data.data
            })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>