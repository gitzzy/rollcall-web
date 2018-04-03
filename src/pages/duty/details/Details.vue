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
        <el-button round class="my-btn-duty rehome" icon="el-icon-refresh" @click="reHome">返回上级</el-button>
      </div>
    </div>
    <div class="table-area">
      <el-table class="my-table" :data="dutyData.content" v-loading="loading" style="width: 100%;" stripe>
        <el-table-column label="日期" prop="rcDate"></el-table-column>
        <el-table-column label="时间" prop="rcTime"></el-table-column>
        <el-table-column label="范围" prop="roomName"></el-table-column>
        <el-table-column label="状态" prop="rcStatus">
          <template slot-scope="scope">
            <div v-if="scope.row.rcStatus === '正常'">正常</div>
            <div class="statusText-warning" v-else>异常</div>
          </template>
        </el-table-column>
        <el-table-column label="人员" prop="personName">
          <template slot-scope="scope">
            <div class="cell" v-html="scope.row.personName"></div>
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
  import Details from './Details.js'

  export default Details
</script>

<style>
  @import "../Duty.css";

  .my-table td {
    padding: 18px 10px 19px !important;
  }
</style>
