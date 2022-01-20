<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="讲师头衔"
        >
          <!-- <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" /> -->
          <el-option
            v-for="val in types"
            :key="val.dictionaryCode"
            :value="val.dictionaryCode"
            :label="val.dictionaryValue"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.queryStartTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.queryEndTime"
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
    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{
            (teacherQuery.currentPage - 1) * teacherQuery.pageSize +
            scope.$index +
            1
          }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.levelName }}
          <!-- {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }} -->
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button 
            v-if="hasPerm('teacher.update')"
            type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="teacherQuery.currentPage"
      :page-size="teacherQuery.pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
import dictionary from "@/api/system/dictionary";
import teacher from "@/api/teacher/teacher";
export default {
  data() {
    return {
      types: {},
      list: {}, //讲师列表数据
      total: 0, //讲师总数量
      teacherQuery: {
        currentPage: 1, // 当前页
        pageSize: 10, //每页显示数据量
      }, //条件封装对象
    };
  },
  created() {
    this.getList();
    let data = { dictionaryType: "TEACHER_LEVEL" };
    dictionary.queryDictionaryByType(data).then((response) => {
      // console.log("types: ",response.data.data)
      this.types = response.data.data;
    });
  },
  methods: {
    //分页查询讲师列表
    getList(page = 1) {
      this.page = page;
      teacher.getTeacherListPage(this.teacherQuery).then((response) => {
        // console.log("教师",response.data.data.data);
        this.list = response.data.data.data;
        this.total = response.data.data.total;
      });
    },
    //重置数据
    resetData() {
      this.teacherQuery = {};
      this.teacherQuery.currentPage = 1;
      this.teacherQuery.pageSize = 10;
      this.getList();
    },
    //删除讲师
    removeDataById(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let data = { id: id };
        teacher.deleteTeacherById(data).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getList();
        });
      });
    },
  },
};
</script>

<style>
</style>