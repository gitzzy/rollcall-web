<template>
  <div class="manage">
    <div class="nav-bar">
      <div class="add-btn" @click="showAlert()">
        <span>新增</span>
      </div>
      <div class="query-form f-right">
        <el-form ref="form" :inline="true" :model="reqData" label-width="80px">
          <el-form-item label="角色名">
            <el-select v-model="reqData.roleNameCn">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="role in roleList" :key="role.id" :label="role.roleNameCn" :value="role.roleNameCn"></el-option>
            </el-select>
            <!--<el-input v-model="reqData.nameCn" placeholder="请输入姓名"></el-input>-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round class="my-btn query-btn" icon="el-icon-search" @click="getApi(reqData)">查询</el-button>
            <el-button round class="my-btn re-home" icon="el-icon-refresh" @click="reHome">返回首页</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="table-area">
      <el-table
        :data="shiftData.content"
        v-loading="loading"
        style="width: 100%;"
        stripe
        headerRowClassName="headerClass">

        <el-table-column label="序号" type="index" width="60x"></el-table-column>
        <el-table-column label="角色名称" prop="roleNameCn"></el-table-column>
        <el-table-column label="失效时间" prop="invalidTime"></el-table-column>
        <el-table-column label="角色备注" prop="roleMemo"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="detailsHandle(scope.row.id, true)">
              <img src="../../../../static/icon/home/icon_details_duty.png"><p>详情</p>
            </el-button>
            <el-button type="text"
                       @click="modifyHandle(scope.row.id)">
              <img src="../../../../static/icon/home/icon_modify.png"><p>修改</p>
            </el-button>
            <el-button type="text"
                       @click="deleteHandle(scope.row.id)">
              <img src="../../../../static/icon/home/icon_delete.png"><p>删除</p>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pages-area">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-size="reqData.size"
          :total="shiftData.totalElements"></el-pagination>
      </div>
    </div>


    <!-- 新增，修改，详情用同一个弹出层 -->
    <transition name="fade">
      <div class="my-message-box role-box" v-show="msgBox" ref="messageBox">
        <!--:disabled="detailType"-->
        <el-form ref="ruleForm" :disabled="detailType" :model="addParams" :rules="rules">
          <div class="my-message-head">{{showTitle}} <span class="el-icon-close" @click="closeAlert('ruleForm')"></span></div>
          <div class="my-box-row clearfix">
            <p class="my-box-row-name">角色管理</p>
            <div class="my-box-item">
              <el-form-item prop="roleName">
                <p class="my-box-item-label"><i class="iconfont el-icon-user"></i>角色编码</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.roleName" placeholder="请输入角色编码"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item">
              <el-form-item prop="roleNameCn">
                <p class="my-box-item-label"><i class="iconfont el-icon-user"></i>角色名称</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.roleNameCn" placeholder="请输入角色名称"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item" v-if="isModify">
              <el-form-item prop="invalidTime">
                <p class="my-box-item-label"><i class="el-icon-time"></i>失效时间</p>
                <div class="my-box-item-control">
                  <el-date-picker v-model="addParams.invalidTime" type="datetime" placeholder="请选择失效时间"></el-date-picker>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item">
              <el-form-item prop="roleMemo">
                <p class="my-box-item-label"><i class="el-icon-edit"></i>角色备注</p>
                <div class="my-box-item-control">
                  <el-input type="textarea" v-model="addParams.roleMemo" placeholder="请输入角色备注"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>

          <div class="my-box-row clearfix">
            <p class="my-box-row-name">数据范围设置</p>
            <div class="my-checkbox-area">
              <el-checkbox-group v-model="checkAreas" size="small">
                <el-checkbox-button v-for="area in allAreasList" :disabled="false" :label="area.id" :key="area.id">{{area.name}}</el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>

          <div class="my-box-row last-box-row clearfix">
            <p class="my-box-row-name">功能权限设置</p>
            <div class="my-tree-area">
              <el-tree
                ref="tree"
                :data="authList"
                show-checkbox
                :default-expand-all="true"
                @getCheckedNodes="true"
                node-key="id">
              </el-tree>
            </div>
          </div>
          <div class="my-message-btns">
            <el-button class="my-btn" round v-if="!detailType" @click="addHandle('ruleForm', singleId)" icon="el-icon-circle-check">确定</el-button>
            <el-button class="my-btn" round v-if="!detailType" @click="closeAlert('ruleForm')" icon="el-icon-circle-close">取消</el-button>
          </div>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Role from './Role.js'
  export default Role
</script>

<style>
  @import "./Role.css";
</style>

