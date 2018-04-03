<template>
  <div class="all">
    <div class="nav-bar">
      <label class="f-left">范围</label>
      <div class="pills-nav-area">
        <nav-pills :navData="navData"></nav-pills>
      </div>
      <div class="query-form">
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
          <el-form-item label="日期">
            <el-date-picker type="date" placeholder="请选择日期" v-model="form.time" @change="formatDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="请选择类型" @change="reqData.jobType = form.type">
              <el-option label="全部" value=""></el-option>
              <el-option label="定时" value="0"></el-option>
              <el-option label="即时" value="1"></el-option>
              <el-option label="补点" value="2"></el-option>
            </el-select>
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
        <el-table-column label="班次" prop="shiftName"></el-table-column>
        <el-table-column label="日期" prop="date" width=""></el-table-column>
        <el-table-column label="时间" prop="time" width="">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.time" placement="top">
              <div class="cell">{{scope.row.time}}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="范围" prop="ranges" width="">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.ranges" placement="top">
              <div class="cell">{{scope.row.ranges}}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="jobTypeName" width=""></el-table-column>
        <el-table-column label="总人数" prop="totalNum" width=""></el-table-column>
        <el-table-column label="实点" prop="realNum" width=""></el-table-column>
        <el-table-column label="外出" prop="outNum" width="">
          <template slot-scope="scope">
            <div :class="scope.row.outNum !== 0 ? 'statusText-warning' : ''">{{scope.row.outNum}}</div>
          </template>
        </el-table-column>
        <el-table-column label="应点未点" prop="failNum" width="">
          <template slot-scope="scope">
            <div :class="scope.row.failNum !== 0 ? 'statusText-warning' : ''">{{scope.row.failNum}}</div>
          </template>
        </el-table-column>
        <el-table-column label="补点人数" prop="repairNum" width=""></el-table-column>
        <el-table-column label="人工确认" prop="confimNum" width=""></el-table-column>
        <el-table-column label="点名结果" prop="result" width="">
          <template slot-scope="scope">
            <div class="statusText statusText-normal normal" v-if="scope.row.result === '正常'">正常</div>
            <div class="statusText statusText-warning warning" v-else>异常</div>
          </template>
        </el-table-column>
        <el-table-column label="民警确认" prop="isPoliceConfim" width="">
          <template slot-scope="scope">
            <div class="statusText statusText-normal" v-if="scope.row.isPoliceConfim === '已确认'">已确认</div>
            <div class="statusText statusText-warning" v-else>未确认</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="loadDetails(scope.row.shiftId, scope.row.shiftName)"><img src="static/icon/home/icon_details.png"><p>详情</p></el-button>
            <el-button type="text"
                       @click="policeConfirm('result-police',
                                              scope.row.loopId,
                                              scope.row.shiftId,
                                              scope.row.date,
                                              scope.row.time,
                                              scope.row.jobTypeName,
                                              scope.row.totalNum,
                                              scope.row.realNum,
                                              scope.row.outNum,
                                              scope.row.failNum,
                                              scope.row.repairNum,
                                              scope.row.confimNum
                                              )">
              <img src="static/icon/home/icon_police.png"><p>民警确认</p>
            </el-button>
            <el-button type="text"
                       @click="repair('repair',
                                      scope.row.loopId,
                                      scope.row.shiftId,
                                      scope.row.date,
                                      scope.row.time,
                                      scope.row.jobTypeName,
                                      scope.row.totalNum,
                                      scope.row.realNum,
                                      scope.row.outNum,
                                      scope.row.failNum,
                                      scope.row.repairNum)">
              <img src="static/icon/home/icon_repair.png"><p>补点</p>
            </el-button>
            <el-button type="text" style="color: #ccc;"><img src="static/icon/home/icon_print.png"><p>打印</p></el-button>
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
  import All from './All.js'
  export default All
</script>

<style>
  @import "../Result.css";

  .all .nav-bar .query-form {
    float: right;
  }
  .all .nav-bar .query-form .el-form--inline .el-form-item {
    margin-bottom: 0;
  }
  .all .nav-bar .query-form .el-input__inner {
    width: 220px;
    border-radius: 20px;
    margin-top: 2px;
    border-color: #fff;
    box-shadow: 0 0 10px #4a92fe;
  }
  .el-input__prefix, .el-input__suffix {
    top: 2px;
  }

  /*.query-btn {
    background-color: #4A92FE;
  }*/
  .all .re-home {
    color: #008CFF !important;
    margin-left: 12px!important;
  }

</style>
