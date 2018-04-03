<template>
  <div class="duty-list">
    <div class="operating-area">
      <div class="query-form">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="日期">
            <el-date-picker type="date" placeholder="请选择查询日期" v-model="form.time" @change="formatDate"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button round class="my-btn-duty" icon="el-icon-search" @click="getData(reqData)">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button round class="my-btn-duty rehome" icon="el-icon-refresh" @click="reHome">返回首页</el-button>
      </div>
    </div>
    <div class="table-area">
      <el-table :data="dutyData.content" v-loading="loading" style="width: 100%;" stripe :row-class-name="tableRowClassName">
        <el-table-column label="日期" prop="rcDate"></el-table-column>
        <el-table-column label="时间" prop="rcTime"></el-table-column>
        <el-table-column label="范围" prop="areaName">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.areaName" placement="top">
              <div class="cell">{{scope.row.areaName}}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="rcStatus">
          <template slot-scope="scope">
            <div v-if="scope.row.rcStatus === '正常'">正常</div>
            <div class="statusText-warning" v-else>异常</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="text" @click="skipRoute('duty-detail', scope.row.id, scope.row.rcDate)"><img src="../../../../static/icon/home/icon_details_duty.png"><p>详情</p></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pages-area">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-size="reqData.size"
          :total="dutyData.totalElements"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Result from './Result.js'

  export default Result
</script>

<style>
  @import "../Duty.css";
</style>
