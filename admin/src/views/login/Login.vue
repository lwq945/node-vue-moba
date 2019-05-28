<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header">
        <span>请先登录</span>
      </div>
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input type="text" v-model="model.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      // 保存token到本地存储
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功!'
      })
    }
  }
}
</script>

<style lang="less">
.login-container {
  .login-card {
    width: 25rem;
    margin: 8rem auto;
  }
}
</style>