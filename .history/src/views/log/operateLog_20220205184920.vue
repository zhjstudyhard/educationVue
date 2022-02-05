<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="queryInfo.userName" placeholder="操作人" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="queryInfo.logType" clearable placeholder="操作类型">
          <el-option
            v-for="(value, key) in logTypeList"
            :key="key"
            :value="key"
            :label="value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="操作时间">
        <el-date-picker
          v-model="queryInfo.queryStartTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="queryInfo.queryEndTime"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="23:59:59"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
      :data="logList"
      row-key="id"
      :tree-props="{ children: 'replyComments' }"
    >
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="操作描述" prop="username">
        <template v-slot="scope">
          {{ scope.row.model }}
        </template>
      </el-table-column>
      <el-table-column label="请求url" width="300">
        <template v-slot="scope">
          {{ scope.row.url }}
        </template></el-table-column
      >
      <el-table-column label="方法名称" width="100">
        <template v-slot="scope">
          {{ scope.row.methodName }}
        </template>
      </el-table-column>
      <el-table-column label="请求参数" show-overflow-tooltip>
        <template v-slot="scope">
          {{ scope.row.params }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="QQ" prop="qq" width="115"></el-table-column> -->
      <el-table-column label="请求类型" width="115">
        <template v-slot="scope">
          {{ scope.row.logTypeName }}
        </template>
      </el-table-column>
      <el-table-column label="操作类型">
        <template v-slot="scope">
          {{ scope.row.method }}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="170">
        <template v-slot="scope">{{ scope.row.gmtCreate }}</template>
      </el-table-column>
      <el-table-column label="操作人" width="100">
        <template v-slot="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column label="接口调用时间" width="170">
        <template v-slot="scope">
          {{ scope.row.resultTime }}
          <span style="color: blue">ms</span>
        </template>
      </el-table-column>
      <el-table-column label="操作结果" width="170">
        <template v-slot="scope">
          <el-button v-if="scope.row.result == 1" type="primary" round>{{
            scope.row.resultName
          }}</el-button>
          <el-button v-if="scope.row.result == 0" type="warning" round>{{
            scope.row.resultName
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="queryInfo.pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
import comment from "@/api/article/comment";
import article from "@/api/article/article";
import operateLog from "@/api/log/operateLog";
export default {
  name: "CommentList",
  data() {
    return {
      pageId: null,
      queryInfo: {
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
      logList: [],
      logTypeList: [],
      isLogin: 1,
    };
  },
  methods: {
    getList() {
      this.currentPage = 1;
      this.getLogList();
    },
    resetData() {
      this.queryInfo = {};
      this.currentPage = 1;
      this.getLogList();
    },
    //分页获取评论列表
    getLogList() {
      operateLog.queryPageLog(this.queryInfo).then((response) => {
        // console.log("logList: ", response.data.data);
        this.logList = response.data.data.data;
        this.total = response.data.data.total;
      });
    },
    //获取所有文章列表
    queryLogType() {
      let data = {isLogin:this.isLogin}
      operateLog.queryLogType(data).then((response) => {
        // console.log("logTypeList: ", response.data);
        this.logTypeList = response.data.data;
      });
    },
    //监听页码改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage;
      this.getLogList();
    },
    //监听 pageSize 改变事件
    handleSizeChange(newPageSize) {
      this.queryInfo.pageSize = newPageSize;
      this.getLogList();
    },

    // showEditDialog(row) {
    //   this.editDialogVisible = true;
    //   this.editForm = row;
    // },
    // deleteCommentById(id) {
    //   let data = { id: id };

    //   this.$confirm("确认删除当前评论?", "Warning", {
    //     confirmButtonText: "确认",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then((response) => {
    //       comment.delComment(data).then((response) => {
    //         this.$message({
    //           type: "success",
    //           message: "删除成功!",
    //         });
    //         this.getCommentList();
    //       });
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // },

    search() {
      this.queryInfo.currentPage = 1;
      this.getLogList();
    },
  },
  created() {
    this.getLogList();
    this.queryLogType();
  },
};
</script>

<style scoped>
</style>