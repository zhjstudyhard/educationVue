<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="关键字输入"
      style="width: 250px; margin-right: 20px"
    />

    <el-table
      :data="treeTable"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :expand-row-keys="expandRow"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="添加时间" sortable width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="() => updateFunction(scope.row)"
            >修改分类
          </el-button>

          <el-button type="text" size="mini" @click="() => remove(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加按钮权限的窗口 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="'修改分类'"
      @close="restData()"
    >
      <el-form
        ref="subject"
        :model="subject"
        :rules="subjectValidateRules"
        label-width="120px"
      >
        <el-form-item label="名称" prop="title">
          <el-input v-model="subject.title" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="restData()">取 消</el-button>
        <el-button type="primary" @click="appendSubject()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import subject from "@/api/subject/subject";
export default {
  data() {
    return {
      filterText: "",
      expandRow: [],
      data2: [], //返回所有分类数据
      defaultProps: {
        children: "children",
        label: "title",
      },
      subject: {},
      dialogVisible: false,
      subjectValidateRules: {
        title: [{ required: true, trigger: "blur", message: "名称必须输入" }],
      },
    };
  },
  created() {
    this.fetchNodeList();
  },
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
    updateFunction(row) {
      this.dialogVisible = true;
      this.subject = JSON.parse(JSON.stringify(row));
    },
    restData() {
      this.subject = {};
      this.dialogVisible = false;
    },
    appendSubject() {
      subject.updateSubject(this.subject).then((response) => {
        //提示信息
        this.dialogVisible = false;
        this.$message({
          type: "success",
          message: "更改课程分类成功",
        });
        location.reload();
      });
      
    },
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
        this.data2 = response.data.data;
      });
    },
  },
};
</script>