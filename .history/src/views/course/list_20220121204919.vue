<template>
  <div class="app-container">
    课程列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="courseQuery.status"
          clearable
          placeholder="课程状态"
        >
          <!-- <el-option value="Normal" label="已发布" />
          <el-option value="Draft" label="未发布" /> -->
          <el-option
            v-for="val in types"
            :key="val.dictionaryCode"
            :value="val.dictionaryCode"
            :label="val.dictionaryValue"
          />
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" width="200" />

      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">
          <!-- {{ scope.row.status === "Normal" ? "已发布" : "未发布" }} -->
          {{ scope.row.statusName }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="viewCount" label="浏览数量" width="60" />

      <el-table-column label="操作" width="600" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程基本信息</el-button
            >
          </router-link>
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程大纲息</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除课程信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
//引入调用course.js文件
import course from "@/api/course/course";
import dictionary from "@/api/system/dictionary";
export default {
  //写核心代码位置
  // data:{
  // },
  data() {
    //定义变量和初始值
    return {
      types: {},
      list: null, //查询之后接口返回集合
      currentPage: 1, //当前页
      pageSize: 10, //每页记录数
      total: 0, //总记录数
      courseQuery: {}, //条件封装对象
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    //调用
    this.getList();
     let data = { dictionaryType: "PUBLISH_STATUS" };
     dictionary.queryDictionaryByType(data).then((response) => {
      // console.log("types: ",response.data.data)
      this.types = response.data.data;
    });
  },
  methods: {
    //创建具体的方法，调用course.js定义的方法
    //课程列表的方法
    getList(page = 1) {
      this.page = page;
      this.courseQuery.currentPage = this.page;
      this.courseQuery.pageSize = this.pageSize;
      course
        .getListCourse(this.courseQuery)
        .then((response) => {
          //请求成功
          //response接口返回的数据
          this.list = response.data.data.data;
          this.total = response.data.data.total;
        });
    },
    removeDataById(id) {
      // this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      //   course.removeCourseById(id).then((response) => {
      //     this.$message({
      //       message: "删除成功",
      //       type: "success",
      //     });
      //     this.getList()
      //   });
      // });
    },
    resetData() {
      //清空的方法
      //表单输入项数据清空
      this.courseQuery = {};
      //查询所有讲师数据
      this.getList();
    },
  },
};
</script>
