<template>
  <div style="margin-left: 20px">
    <!--主体内容-->
    <div class="m-content">
      <!--文章内容表单-->
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        label-position="top"
        label-width="100px"
      >
        <!--文章标题和首图url-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文章标题" prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文章首图URL" prop="firstPicture">
              <el-input
                v-model="ruleForm.firstPicture"
                placeholder="文章首图，可为空"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--文章描述-->
        <el-form-item label="文章描述" prop="description">
          <mavon-editor
            @dblclick.native="autoWrite"
            v-model="ruleForm.description"
          />
        </el-form-item>
        <el-form-item label="文章正文" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>
        <!--分类-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类" prop="cate">
              <el-select
                v-model="ruleForm.type"
                placeholder="请选择分类（输入可添加新分类）"
                style="width: 100%"
              >
                <!-- <el-select v-model="ruleForm.type" :allow-create="true" :filterable="true" placeholder="请选择分类（输入可添加新分类）" style="width: 100%;"> -->
                <el-option
                  v-for="type in types"
                  :key="type.dictionaryCode"
                  :label="type.dictionaryValue"
                  :value="type.dictionaryCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--标签，暂时未实现-->
          <!-- <el-col :span="12">
            <el-form-item label="标签" prop="tagList">
              <el-select v-model="ruleForm.tagList" :allow-create="true" :filterable="true" :multiple="true" placeholder="请选择标签（输入可添加新标签）" style="width: 100%;">
                <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <!--字数显示-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="字数" prop="words">
              <!-- 双击计算文章字数-->
              <el-input
                v-model="ruleForm.words"
                placeholder="请输入文章字数"
                type="number"
                @dblclick.native="computeWords"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--浏览次数-->
          <el-col :span="12">
            <el-form-item label="浏览次数" prop="views">
              <el-input
                v-model="ruleForm.views"
                placeholder="请输入浏览次数（可选）默认为 0"
                type="number"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--是否公开-->
          <el-col :span="12">
            <el-form-item label="是否公开" prop="publised">
              <el-tooltip
                :content="'Switch value: ' + ruleForm.status"
                placement="top"
              >
                <el-switch
                  v-model="ruleForm.status"
                  :active-value="1"
                  :inactive-value="0"
                ></el-switch>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <!--提交和重置按钮-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import dictionary from "@/api/system/dictionary";
import article from "@/api/article/article";
export default {
  // name: "BlogEdit",
  data() {
    return {
      types: {},
      ruleForm: {
        id: "",
        title: "",
        description: "",
        content: "",
        firstPicture: "",
        type: "",
        words: null,
        views: 0,
        status: 0,
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 2,
            max: 45,
            message: "长度在 3 到 45 个字符",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        words: [
          { required: true, message: "请输入文章字数", trigger: "change" },
        ],
      },
    };
  },
  // 监听器
  watch: {
    $route(to, from) {
      this.getTypes();
      this.init();
    },
  },

  created() {
    this.getTypes();
    this.init();
  },
  methods: {
    //通过id获取文章
    init() {
      if (this.$route.params && this.$route.params.id) {
        let data = { id: this.$route.params.id };
        article.getArticleById(data).then((response) => {
          this.ruleForm = response.data.data;
        });
      }
    },
    //双击将正文的内容前100字自动写入文章描述中
    autoWrite() {
      if (this.ruleForm.content.length < 100) {
        this.ruleForm.description = this.ruleForm.content.substring(
          0,
          this.ruleForm.content.length
        );
      } else {
        this.ruleForm.description = this.ruleForm.content.substring(0, 100);
      }
    },
    //双击将计算正文内容的字数
    computeWords() {
      var contents = this.ruleForm.content;
      this.ruleForm.words = contents.replace(
        /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ""
      ).length;
    },
    //提交文章
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          if (_this.ruleForm.id == "") {
            article.addArticle(this.ruleForm).then((response) => {
              _this.$alert("操作成功", "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  _this.$router.push("articleList");
                },
              });
            });
          } else {
            this.$axios.post("/blog/update", this.ruleForm).then((res) => {
              console.log(res);
              _this.$alert("操作成功", "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  _this.$router.push("articleList");
                },
              });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置文章内容
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取文章分类
    getTypes() {
      let data = { dictionaryType: "ARTICLE_CATEGORY" };
      dictionary.queryDictionaryByType(data).then((response) => {
        this.types = response.data.data;
      });
    },
  },
};
</script>
<style scoped>
.m-content {
  width: 100%;
}
</style>