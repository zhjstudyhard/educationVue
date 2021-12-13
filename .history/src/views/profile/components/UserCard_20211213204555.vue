<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">
          {{ user.role | uppercaseFirst }}
        </div>
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
                <!-- <div class="user-right">{{ user.dept.name }}</div> -->
                <div class="user-right">{{ user.username }}</div>
              </li>
              <li>
                <svg-icon icon-class="phone" /> 手机号码
                <!-- <div class="user-right">{{ user.phone }}</div> -->
                 <div class="user-right">{{ user.username }}</div>
              </li>
              <li>
                <svg-icon icon-class="email" /> 用户邮箱
                <!-- <div class="user-right">{{ user.email }}</div> -->
                 <div class="user-right">{{ user.username }}</div>
              </li>
              <li>
                <svg-icon icon-class="anq" /> 安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">修改密码</a>
                  <a @click="$refs.email.dialog = true">修改邮箱</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section"></div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from "@/components/PanThumb";

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
          avatar: "",
          role: "",
        };
      },
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
}
</style>
