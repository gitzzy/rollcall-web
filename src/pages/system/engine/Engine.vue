<template>
  <div class="manage engine">
    <div class="nav-bar">
      <div class="add-btn" @click="showAlert()">
        <span>新增</span>
      </div>
      <div class="query-form f-right">
        <el-form ref="form" :inline="true" :model="reqData" label-width="80px">
          <el-form-item label="引擎">
            <el-input v-model="reqData.engineName" :clearable="true" placeholder="请输入引擎名称"></el-input>
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
        <el-table-column label="引擎名称" prop="engineName"></el-table-column>
        <el-table-column label="实时状态" prop="engineStatus" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.engineStatus === '0'" class="text-warning"><i class="el-icon-warning"></i>异常</span>
            <span v-else-if="scope.row.engineStatus === '1'" class="text-success"><i class="el-icon-success"></i>正常</span>
          </template>
        </el-table-column>
        <el-table-column label="引擎IP" prop="engineIp"></el-table-column>
        <el-table-column label="引擎端口" prop="enginePort"></el-table-column>
        <el-table-column label="配置时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
        <el-form ref="ruleForm" :model="addParams" :rules="rules">
          <div class="my-message-head">{{showTitle}} <span class="el-icon-close" @click="closeAlert('ruleForm')"></span></div>
          <div class="my-box-row clearfix">
            <div class="my-box-item full-row">
              <el-form-item prop="engineName">
                <p class="my-box-item-label"><i class="el-icon-edit"></i>引擎名称</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.engineName" :clearable="true" placeholder="请输入引擎名称"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="my-box-row clearfix">
            <div class="my-box-item full-row">
              <el-form-item prop="engineIp">
                <p class="my-box-item-label"><i class="el-icon-location-outline"></i>服务地址</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.engineIp" :clearable="true" placeholder="请输入服务地址"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="my-box-row clearfix">
            <div class="my-box-item full-row">
              <el-form-item prop="enginePort">
                <p class="my-box-item-label"><i class="el-icon-news"></i>引擎端口</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.enginePort" :clearable="true" placeholder="请输入引擎端口"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="my-box-row clearfix">
            <div class="my-box-item my-box-item-row">
              <el-form-item prop="engineStatus">
                <p class="my-box-item-label"><i class="el-icon-time"></i>实时状态</p>
                <div class="my-box-item-control">
                  <el-radio-group v-model="addParams.engineStatus">
                    <el-radio-button label="0">异常</el-radio-button>
                    <el-radio-button label="1">正常</el-radio-button>
                  </el-radio-group>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item"></div>
          </div>
          <div class="my-message-btns">
            <el-button class="my-btn" round @click="addHandle('ruleForm', singleId)" icon="el-icon-circle-check">确定</el-button>
            <el-button class="my-btn" round @click="closeAlert('ruleForm')" icon="el-icon-circle-close">取消</el-button>
          </div>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Engine from './Engine.js'
  export default Engine
</script>

<style>
  .engine .my-message-box {
    width: 450px;
  }
  .engine .el-radio-button__inner {
    padding: 12px 78px;
  }
  .my-message-box .my-box-row .my-box-item.full-row .my-box-item-control .el-input .el-input__inner {
    width: 380px;
  }

  .manage .text-warning {
    color: #f00;
  }
  .manage .text-success {
    color: #097C25;
  }
  .manage .text-warning i, .manage .text-success i {
    margin-right: 4px;
  }
</style>

