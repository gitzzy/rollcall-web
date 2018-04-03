<template>
  <div class="warning-list">
    <div class="nav-bar">
      <div class="query-form">
        <el-form ref="form" class="f-left" :inline="true" :model="form" label-width="50px">
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.time"
              @change="formatDate"
              type="date"
              placeholder="请选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="请选择类型" @change="reqData.eventType = form.type">
              <el-option label="全部" value=""></el-option>
              <el-option label="点名" value="0"></el-option>
              <el-option label="值小岗" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round class="my-btn query-btn" icon="el-icon-search" @click="getApi(reqData)">查询</el-button>
          </el-form-item>
        </el-form>

        <el-button round class="my-btn re-home f-right" icon="el-icon-refresh" @click="reHome">返回首页</el-button>
      </div>
    </div>

    <div class="table-area">
      <el-table :data="shiftData.content" v-loading="loading" style="width: 100%;" stripe headerRowClassName="headerClass">
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column label="事件发生时间" prop="eventTime" width=""></el-table-column>
        <el-table-column label="事件类型" prop="eventType" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.eventType === '0'">点名</span>
            <span v-else-if="scope.row.eventType === '1'">值小岗</span>
          </template>
        </el-table-column>
        <el-table-column label="报警时间" prop="warnTime" width=""></el-table-column>
        <!--<el-table-column label="事件描述" prop="eventDesc" width="">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.eventDesc" placement="top">
              <div class="cell">
                {{scope.row.eventDesc}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>-->
        <el-table-column label="是否已读" prop="isRead" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.isRead === '0'">未读</span>
            <span v-else-if="scope.row.isRead === '1'">已读</span>
          </template>
        </el-table-column>
        <el-table-column label="阅读人" prop="readUserId" width=""></el-table-column>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import Warning from './Warning.js'
  export default Warning
</script>

<style>
  @import "./Warning.css";

  .warning-list .nav-bar .query-form .el-form--inline .el-form-item {
    margin-bottom: 0;
  }
  .warning-list .nav-bar .query-form .el-input__inner {
    width: 220px;
    border-radius: 20px;
    margin-top: 3px;
    border-color: #fff;
    box-shadow: 0 0 10px #4a92fe;
  }
  .el-input__prefix, .el-input__suffix {
    top: 2px;
  }

  /*.query-btn {
    background-color: #4A92FE;
  }*/
  .re-home {
    color: #008CFF;
    margin-left: 12px!important;
  }

</style>
