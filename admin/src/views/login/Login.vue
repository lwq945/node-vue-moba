<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header">
        <span>请先登录</span>
      </div>
      <el-form :model="model" :rules="rules" ref="loginFrom" @submit.native.prevent="login">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="model.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
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
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // async login() {
    //   const res = await this.$http.post('login', this.model)
    //   //console.log(res)
    //   // 保存token到本地存储
    //   localStorage.token = res.data.token
    //   localStorage.username = res.data.username
    //   this.$router.push('/')
    //   this.$message({
    //     type: 'success',
    //     message: '登录成功!'
    //   })
    // }

     login() {
      this.$refs.loginFrom.validate( async valid => {
        if (valid) {
          const res = await this.$http.post('login', this.model)
          localStorage.token = res.data.token
          localStorage.username = res.data.username
          this.$router.push('/')
          this.$message({
            type: 'success',
            message: '登录成功!'
          })
        }
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