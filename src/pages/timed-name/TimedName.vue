<template>
  <div class="timedname">
    <div class="nav-bar">
      <div class="add-btn" @click="add">
        <span>
          新增
        </span>
      </div>
      <div class="query-form">
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-form-item label="时间">
            <el-time-picker v-model="form.time" :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
            }" placeholder="请选择时间" @change="formatDate"></el-time-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round class="my-btn query-btn" icon="el-icon-search" @click="getApi(reqData)">查询</el-button>
            <el-button round class="my-btn re-home" icon="el-icon-refresh" @click="reHome">返回首页</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="table-area">
      <el-table :data="shiftData.content" v-loading="loading" style="width: 100%;" stripe headerRowClassName="headerClass">
        <el-table-column label="班次" prop="shift.shiftName" width=""></el-table-column>
        <el-table-column label="时间" prop="time" width=""></el-table-column>
        <el-table-column label="范围" prop="ranges" width="">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.ranges" placement="top">
              <div class="cell">
                {{scope.row.ranges}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="任务修改人" prop="modifyName" width=""></el-table-column>
        <el-table-column label="任务修改时间" prop="modifyTime" width=""></el-table-column>
        <el-table-column label="备注" prop="memo" width="">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.memo" placement="top">
              <div class="cell">
                {{scope.row.memo}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="detailsHandle(scope.row.id)">
              <img src="static/icon/home/icon_details_duty.png"><p>详情</p>
            </el-button>
            <el-button type="text"
                       v-if="scope.row.isModify === '0'"
                       @click="modifyHandle(scope.row.id)">
              <img src="static/icon/home/icon_modify.png"><p>修改</p>
            </el-button>
            <el-button type="text"
                       @click="deleteEvent(scope.row.id)">
              <img src="static/icon/home/icon_delete.png"><p>删除</p>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import TimedName from './TimedName.js'
  export default TimedName
</script>

<style>
  @import "./TimedName.css";

  .timedname .nav-bar .query-form {
    float: right;
  }
  .timedname .nav-bar .query-form .el-form--inline .el-form-item {
    margin-bottom: 0;
  }
  .timedname .nav-bar .query-form .el-input__inner {
    width: 220px;
    border-radius: 20px;
    margin-top: 2px;
    border-color: #fff;
    box-shadow: 0 0 10px #4a92fe;
  }
  .el-input__prefix, .el-input__suffix {
    top: 2px;
  }

  .query-btn {
    background-color: #4A92FE;
    color: #fff!important;
  }
  .re-home {
    color: #008CFF;
    margin-left: 12px!important;
  }

</style>
