<template>
  <div class="manage">
    <div class="nav-bar">
      <div class="add-btn" @click="showAlert()">
        <span>新增</span>
      </div>
      <div class="query-form f-right">
        <el-form ref="form" :inline="true" :model="reqData" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="reqData.nameCn" placeholder="请输入姓名"></el-input>
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
        <el-table-column label="姓名" prop="nameCn"></el-table-column>
        <el-table-column label="身份证号" prop="cardNum"></el-table-column>
        <el-table-column label="警号" prop="policeNum"></el-table-column>
        <el-table-column label="时间" prop="createTime"></el-table-column>
        <el-table-column label="最后登陆时间" prop="lastLoginTime"></el-table-column>
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
      <div class="my-message-box" v-show="msgBox" ref="messageBox">
        <el-form ref="ruleForm" :disabled="detailType" :model="addParams" :rules="rules">
          <div class="my-message-head">{{showTitle}} <span class="el-icon-close" @click="closeAlert('ruleForm')"></span></div>
          <div class="my-box-row clearfix">
            <div class="my-box-item">
              <el-form-item prop="name">
                <p class="my-box-item-label"><i class="iconfont el-icon-user"></i>用户名</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.name" placeholder="请输入用户名"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item">
              <el-form-item prop="nameCn">
                <p class="my-box-item-label"><i class="iconfont el-icon-user"></i>姓名</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.nameCn" placeholder="请输入姓名"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="my-box-row clearfix">
            <div class="my-box-item">
              <el-form-item prop="cardNum">
                <p class="my-box-item-label"><i class="el-icon-document"></i>身份证号</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.cardNum" placeholder="请输入身份证号"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item">
              <el-form-item prop="policeNum">
                <p class="my-box-item-label"><i class="el-icon-document"></i>警号</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.policeNum" placeholder="请输入警号"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="my-box-row clearfix">
            <div class="my-box-item my-box-item-row">
              <p class="my-box-item-label"><i class="iconfont el-icon-user"></i>授权角色</p>
              <div class="my-box-item-control overflow-scroll">
                <el-checkbox-group v-model="roleList">
                  <div class="my-checkbox-row">
                    <el-checkbox v-for="role in roleSelectList"
                                 :key="role.id"
                                 :label="role.id">{{role.roleNameCn}}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div class="my-box-item"></div>
          </div>
          <div class="my-message-btns">
            <el-button class="my-btn" v-if="!detailType" round @click="addHandle('ruleForm', singleId)" icon="el-icon-circle-check">确定</el-button>
            <el-button class="my-btn" v-if="!detailType" round @click="closeAlert('ruleForm')" icon="el-icon-circle-close">取消</el-button>
          </div>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import User from './User.js'
  export default User
</script>

<style>
</style>
