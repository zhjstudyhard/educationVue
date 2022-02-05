<template>
  <div>
    <!--搜索-->
    <!-- <el-row>
      <el-col :span="6">
        <el-select
          v-model="queryInfo.articleId"
          placeholder="请选择页面"
          :filterable="true"
          :clearable="true"
          @change="search"
          size="small"
          style="min-width: 400px"
        >
          <el-option
            :label="item.title"
            :value="item.id"
            v-for="item in articleList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row> -->

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
      <!-- <el-table-column label="头像" width="80">
        <template v-slot="scope">
          <el-avatar
            shape="square"
            :size="60"
            fit="contain"
            :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>
      -->
      <el-table-column label="请求url" show-overflow-tooltip>
        <template v-slot="scope">
          {{ scope.row.url }}
        </template></el-table-column
      >
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
      <el-table-column label="操作人" width="170">
        <template v-slot="scope">{{ scope.row.userName }}</template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button
            v-if="hasPerm('comment.del')"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteCommentById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
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
        // isAdmin: 1,
        // page: null,
        // articleId: null,
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
      logList: [],
      // articleList: [],
    };
  },
  methods: {
    //分页获取评论列表
    getLogList() {
      operateLog.queryPageLog(this.queryInfo).then((response) => {
        console.log("logList: ", response.data.data);
        this.logList = response.data.data.data;
        this.total = response.data.data.total;
      });
    },
    //获取所有文章列表
    // getArticleList() {
    //   let data = { isAdmin: this.queryInfo.isAdmin };
    //   article.getAllArticle(data).then((response) => {
    //     // console.log("comment: ", response.data.data);
    //     this.articleList = response.data.data.data;
    //   });

    // },
    //监听页码改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.currentPage = newPage;
      this.getCommentList();
    },
    //监听 pageSize 改变事件
    handleSizeChange(newPageSize) {
      this.queryInfo.pageSize = newPageSize;
      this.getCommentList();
    },

    showEditDialog(row) {
      this.editDialogVisible = true;
      this.editForm = row;
    },
    deleteCommentById(id) {
      let data = { id: id };

      this.$confirm("确认删除当前评论?", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((response) => {
          comment.delComment(data).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCommentList();
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },

    search() {
      this.queryInfo.currentPage = 1;
      this.getCommentList();
    },
  },
  created() {
    this.getLogList();
    // this.getArticleList();
  },
};
</script>

<style scoped>
</style>