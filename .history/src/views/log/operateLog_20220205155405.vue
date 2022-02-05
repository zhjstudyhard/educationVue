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
      :data="commentList"
      row-key="id"
      :tree-props="{ children: 'replyComments' }"
    >
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="操作描述" prop="username">
        <template v-slot="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="80">
        <template v-slot="scope">
          <el-avatar
            shape="square"
            :size="60"
            fit="contain"
            :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        label="请求url"
        prop="content"
        show-overflow-tooltip
      ></el-table-column>
      <!-- <el-table-column label="QQ" prop="qq" width="115"></el-table-column> -->
      <el-table-column label="请求类型" show-overflow-tooltip>
        <template v-slot="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="170">
        <template v-slot="scope">{{ scope.row.gmtCreate }}</template>
      </el-table-column>
       <el-table-column label="操作人" width="170">
        <template v-slot="scope">{{ scope.row.gmtCreate }}</template>
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

    <!--编辑评论对话框-->
    <!-- <el-dialog
      title="编辑评论"
      width="50%"
      :visible.sync="editDialogVisible"
      :close-on-click-modal="false"
      @close="editDialogClosed"
    > -->
    <!--内容主体-->
    <!-- <el-form
        :model="editForm"
        :rules="formRules"
        ref="editFormRef"
        label-width="80px"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="editForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="editForm.avatar"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="网站" prop="website">
          <el-input v-model="editForm.website"></el-input>
        </el-form-item>
        <el-form-item label="ip" prop="ip">
          <el-input v-model="editForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="评论内容" prop="content">
          <el-input
            v-model="editForm.content"
            type="textarea"
            maxlength="255"
            :rows="5"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form> -->
    <!--底部-->
    <!-- <span slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editComment">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import comment from "@/api/article/comment";
import article from "@/api/article/article";
export default {
  name: "CommentList",
  data() {
    return {
      pageId: null,
      queryInfo: {
        isAdmin: 1,
        // page: null,
        articleId: null,
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
      commentList: [],
      articleList: [],
      editDialogVisible: false,
      editForm: {
        id: null,
        nickname: "",
        avatar: "",
        email: "",
        website: null,
        ip: "",
        content: "",
      },
      formRules: {
        nickname: [
          { required: true, message: "请输入评论昵称", trigger: "blur" },
        ],
        avatar: [
          { required: true, message: "请输入评论头像", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入评论邮箱", trigger: "blur" }],
        ip: [
          { required: true, message: "请输入评论ip", trigger: "blur" },
          // {validator: checkIpv4, trigger: 'blur'}
        ],
        content: [
          { required: true, message: "请输入评论内容", trigger: "blur" },
          { max: 255, message: "评论内容不可多于255个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //分页获取评论列表
    getCommentList() {
      comment.queryAllComment(this.queryInfo).then((response) => {
        console.log("comment: ", response.data.data);
        this.commentList = response.data.data.data;
        this.total = response.data.data.total;
      });
     
    },
    //获取所有文章列表
    getArticleList() {
      let data = { isAdmin: this.queryInfo.isAdmin };
      article.getAllArticle(data).then((response) => {
        // console.log("comment: ", response.data.data);
        this.articleList = response.data.data.data;
      });
      
    },
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
    this.getCommentList();
    this.getArticleList();
  },
};
</script>

<style scoped>
</style>