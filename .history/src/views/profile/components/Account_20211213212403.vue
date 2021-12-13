<!--
 * @Author: your name
 * @Date: 2021-11-30 16:53:28
 * @LastEditTime: 2021-12-13 21:24:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-admin\src\views\profile\components\Account.vue
-->
<template>
  <el-form style="margin-top: 10px;" size="small" label-width="width: 50%">
    <el-form-item label="用户名">
      <el-input v-model.trim="user.name" style="width: 35%" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model.trim="user.email" style="width: 35%" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
        };
      },
    },
  },
  methods: {
    submit() {
      this.$message({
        message: "用户信息更新成功",
        type: "success",
        duration: 5 * 1000,
      });
    },
  },
};
</script>
