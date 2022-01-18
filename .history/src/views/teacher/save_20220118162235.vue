<template>
  <div class="app-container">
    讲师表单
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
          :max="99"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
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
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>

        <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
        <input type="file" name="file"/>
      -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="'/api/upload/uploadFile'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import ImageCropper from "@/components/ImageCropper";
import teacher from "@/api/teacher/teacher";
import dictionary from "@/api/system/dictionary";
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      types: {},
      teacher: {
        name: "",
        sort: 0,
        level: "",
        career: "",
        intro: "",
        avatar: "",
        fileId: "",
      },
      //上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 1,
      // BASE_API: process.env.VUE_APP_BASE_API,
      saveBtnDisabled: false, // 保存按钮是否禁用,
    };
  },
  created() {
    this.init();
  },
  methods: {
    //上传成功组件
    cropSuccess(data) {
      this.imagecropperShow = false;
      // console.log("avatar",data);
      this.teacher.avatar = data.data.filePath;
      this.teacher.fileId = data.data.id;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    //关闭上传组件
    close() {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    init() {
      let data = { dictionaryType: "TEACHER_LEVEL" };
      dictionary.queryDictionaryByType(data).then((response) => {
        // console.log("types: ",response.data.data)
        this.types = response.data.data;
      });
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        //根据id查询讲师
        let data = { id: id };
        teacher.getTeacherById(data).then((response) => {
          console.log("教师",response.data);
          this.teacher = response.data.data;
        });
      } else {
        //清空表单
        this.teacher = {};
      }
    },
    //执行更新操作
    saveOrUpdate() {
      if (this.teacher.id) {
        this.updateTeacherInfo();
      } else {
        this.insertTeacherInfo();
      }
    },
    //更新讲师
    updateTeacherInfo() {
      teacher.updateTeacher(this.teacher).then((response) => {
        this.$message({
          message: "更新讲师成功",
          type: "success",
        });
        this.$router.push({ path: "/teacher/teacherList" });
      });
    },
    //添加讲师
    insertTeacherInfo() {
      teacher.addTeacher(this.teacher).then((response) => {
        this.$message({
          message: "添加讲师成功",
          type: "success",
        });
        this.$router.push({ path: "/teacher/teacherList" });
      });
    },
  },
};
</script>

<style>
</style>