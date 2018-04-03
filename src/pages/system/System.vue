<template>
  <div class="system">
    <div class="menu-area f-left">
      <el-menu
        :default-active="activePage"
        background-color="#4a92fe"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        @select="selectMenuItem">

        <el-menu-item index="/sys-manage/user">
          <i class="iconfont el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/sys-manage/role">
          <i class="iconfont el-icon-role"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/sys-manage/device">
          <i class="iconfont el-icon-device"></i>
          <span slot="title">设备管理</span>
        </el-menu-item>
        <el-menu-item index="/sys-manage/engine">
          <i class="iconfont el-icon-engine"></i>
          <span slot="title">引擎管理</span>
        </el-menu-item>

      </el-menu>
    </div>
    <div class="content-area f-left">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import System from './System.js'

  export default System
</script>

<style>
  @import "./System.css";
  @import "./manage.css";
</style>
