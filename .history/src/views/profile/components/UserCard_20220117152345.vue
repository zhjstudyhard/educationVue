<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>

    <div class="user-profile">
      <!-- <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div> -->
      <!-- <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">
          {{ user.role | uppercaseFirst }}
        </div>
      </div> -->
      <div class="box-center">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8089/api/upload/uploadFile"
          :headers="header"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="user.avatar" :src="user.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="box-center">
        <div v-if="user.avatar">
          <el-button type="primary" @click="updateAvatar"
            >确认修改头像<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </div>
        <!-- <div class="user-name text-center">{{ user.username }}</div> -->
        <div class="user-role text-center text-muted"></div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="education" /><span>Education</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <ul class="user-info">
              <li>
                <div style="height: 100%">
                  登录账号
                  <div class="user-right">{{ user.username }}</div>
                </div>
              </li>
              <li>
                创建时间
                <div class="user-right">{{ user.gmtCreate }}</div>
              </li>
              <li>
                安全设置
                <div class="user-right">
                  <a @click="dialogFormVisible = true" style="cursor: pointer"
                    >修改密码</a
                  >
                </div>
              </li>
            </ul>
            <!-- <ul class="user-info">
              <li>
                <div style="height: 100%">
                  <svg-icon icon-class="login" /> 登录账号
                  <div class="user-right">{{ user.username }}</div>
                </div>
              </li>
              <li>
                <svg-icon icon-class="user1" /> 用户昵称
                <div class="user-right">{{ user.username }}</div>
              </li>
              <li>
                <svg-icon icon-class="dept" /> 所属部门
                <
                <div class="user-right">{{ user.username }}</div>
              </li>
              <li>
                <svg-icon icon-class="phone" /> 手机号码
              
                <div class="user-right">{{ user.username }}</div>
              </li>
              <li>
                <svg-icon icon-class="email" /> 用户邮箱
          
                <div class="user-right">{{ user.username }}</div>
              </li>
              <li>
                <svg-icon icon-class="anq" /> 安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">修改密码</a>
                  <a @click="$refs.email.dialog = true">修改邮箱</a>
                </div>
              </li>
            </ul> -->
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section"></div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import { encrypt } from '@/utils/rsaEncrypt'
export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: "",
          avatar: "",
        };
      },
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      fileId: "",
      passForm: {
        oldPassword: "",
        newPassword: "",
        checkPassword: "",
      },
      dialogFormVisible: false,
      rules: {
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        checkPassword: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    updateAvatar() {
      let data = { fileId: this.fileId };
      updateAvatar(data).then((response) => {
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
      });
    },
    handleAvatarSuccess(res, file) {
      this.user.avatar = res.data.data.filePath;
      this.fileId = res.data.data.id;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // passForm.password = encrypt(user.password);
          let data = {
            oldPassword: encrypt(this.passForm.oldPassword.trim()),
            newPassword: encrypt(this.passForm.newPassword),
          };
          updatePassword(data).then((response) => {
            this.$alert("修改成功", "提示", {
              confirmButtonText: "重新登陆",
              callback: (action) => {
                this.$refs[formName].resetFields();
                this.$router.push({ path: "/login" });
              },
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info {
    padding-left: 0;
    list-style: none;
    li {
      border-bottom: 1px solid #F0F3F4;
      padding: 11px 0;
      font-size: 13px;
    }
    .user-right {
      float: right;
      a {
        color: #317EF3;
      }
    }
  }
}
</style>
