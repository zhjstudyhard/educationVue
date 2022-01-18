<!--
 * @Author: your name
 * @Date: 2022-01-18 17:40:48
 * @LastEditTime: 2022-01-18 20:25:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\views\subject\list.vue
-->
<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />

    <!-- <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    /> -->

    <el-table
      :data="treeTable"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :expand-row-keys="expandRow"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- default-expand-all -->
      <el-table-column prop="title" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="path" label="访问路径" sortable width="180">
      </el-table-column>
      <el-table-column prop="component" label="组件路径" sortable width="180">
      </el-table-column>
      <el-table-column prop="permissionValue" label="权限值"> </el-table-column>
      <el-table-column prop="typeName" label="类型"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="() => updateFunction(scope.row)"
            >修改功能
          </el-button>

          <el-button type="text" size="mini" @click="() => remove(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import subject from "@/api/subject/subject";
export default {
  data() {
    return {
      filterText: "",
      data2: [], //返回所有分类数据
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  created() {
    // this.getAllSubjectList();
    this.fetchNodeList();
  },
  // watch: {
  //   filterText(val) {
  //     this.$refs.tree2.filter(val);
  //   },
  // },
  computed: {
    treeTable: function () {
      var searchValue = this.filterText;
      if (searchValue) {
        let treeData = this.data2;
        let handleTreeData = this.handleTreeData(treeData, searchValue);
        this.setExpandRow(handleTreeData);
        this.expandRow = this.expandRow.join(",").split(",");
        return handleTreeData;
      }
      return this.data2;
    },
  },

  methods: {
    getAllSubjectList() {
      subject.getSubjectList().then((response) => {
        // console.log("data2: ",response.data.data)
        this.data2 = response.data.data;
      });
    },
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    // },
    //  树形表格过滤
    handleTreeData(treeData, searchValue) {
      if (!treeData || treeData.length === 0) {
        return [];
      }
      const array = [];
      for (let i = 0; i < treeData.length; i += 1) {
        let match = false;
        for (let pro in treeData[i]) {
          if (typeof treeData[i][pro] == "string") {
            match |= treeData[i][pro].includes(searchValue);
            if (match) break;
          }
        }
        if (
          this.handleTreeData(treeData[i].children, searchValue).length > 0 ||
          match
        ) {
          array.push({
            ...treeData[i],
            children: this.handleTreeData(treeData[i].children, searchValue),
          });
        }
      }
      return array;
    },
    // 将过滤好的树形数据展开
    setExpandRow(handleTreeData) {
      if (handleTreeData.length) {
        for (let i of handleTreeData) {
          this.expandRow.push(i.id);
          if (i.children.length) {
            this.setExpandRow(i.children);
          }
        }
      }
    },

    fetchNodeList() {
       subject.getSubjectList().then((response) => {
        // console.log("data2: ",response.data.data)
        this.data2 = response.data.data;
      });
      // let data = { name: this.name };
      // menu.getPermissionTreeList(data).then((response) => {
      //   this.menuList = response.data.children;
      // });
    },
  },
};
</script>