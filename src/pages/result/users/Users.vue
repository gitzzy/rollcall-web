<template>
  <div class="all">

    <message :content="alertData" :isShow="showAlert" @close="closeAlert"></message>

    <div class="nav-bar">
      <label class="f-left">范围</label>
      <div class="pills-nav-area">
        <nav-pills :navData="navData"></nav-pills>
      </div>
      <el-button round class="my-btn re-home f-right" icon="el-icon-refresh" @click="reHome">返回上级</el-button>
    </div>

    <div class="table-area">
      <el-table :data="shiftData.content" v-loading="loading" style="width: 100%;" stripe headerRowClassName="headerClass">
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column label="日期" prop="date" width=""></el-table-column>
        <el-table-column label="时间" prop="time" width=""></el-table-column>
        <el-table-column label="类型" prop="jobTypeName" width=""></el-table-column>
        <el-table-column label="人员" prop="name" width=""></el-table-column>
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
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="showDetails(scope.row.loopId, scope.row.userMyId)">
              <img src="../../../../static/icon/home/icon_details.png"><p>详情</p>
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
  import Users from './Users.js'
  export default Users
</script>

<style>
  @import "../Result.css";
  .all .re-home {
    color: #008CFF!important;
  }
</style>
