<template>
  <div class="login">
    <el-row>
      <el-col :sapn="24">
        <div class="content">
          <el-form>
            <el-form-item prop='username'>
              <el-input type="text" auto-complete="off" placeholder="账号" v-model='user.username'></el-input>
            </el-form-item>
            <el-form-item prop='password'>
              <el-input type="password" auto-complete="off" placeholder="密码" autoComplete="new-password" v-model='user.password'></el-input>
            </el-form-item>
            <el-button type="primary" @click="onLogin">登录</el-button>
            <el-button>重置</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import Login from './Login.js'
  export default Login
</script>

<style scoped>
  @import "Login.css";
</style>
