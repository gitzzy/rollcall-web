<template>
  <div class="prisoner">
    <div class="nav-bar">
      <div class="query-form">
        <el-form ref="form" :inline="true" :model="reqData" label-width="80px">
          <el-form-item label="监区">
            <el-select v-model="reqData.prisonAreaId" placeholder="请选择监区">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="area in areaList" :label="area.name" :value="area.id" :key="area.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round class="my-btn query-btn" icon="el-icon-search" @click="getApi(reqData)">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button round class="my-btn re-home" icon="el-icon-refresh" @click="reHome">返回首页</el-button>
      </div>
    </div>
    <div class="table-area">
      <el-table :data="shiftData.content" v-loading="loading" style="width: 100%;" stripe headerRowClassName="headerClass">
        <el-table-column label="监区" prop="name"></el-table-column>
        <el-table-column label="总数" prop="allCnt" width=""></el-table-column>
        <!--<el-table-column label="入监" prop="enterPrisonCnt" width=""></el-table-column>-->
        <el-table-column label="临时出所" prop="leavePrison" width=""></el-table-column>
        <el-table-column label="提讯" prop="arraignmentCnt" width=""></el-table-column>
        <el-table-column label="提押" prop="escortCnt" width=""></el-table-column>
        <!--<el-table-column label="监室调整" prop="roomChange" width=""></el-table-column>-->
        <el-table-column label="所外就医" prop="outsideHeal" width=""></el-table-column>
        <!--<el-table-column label="所内巡诊" prop="insideVisits" width=""></el-table-column>-->
        <!--<el-table-column label="所内就医" prop="insideHeal" width=""></el-table-column>-->
        <el-table-column label="律师会见" prop="lawyerMeeting" width=""></el-table-column>
        <el-table-column label="家属会见" prop="familyMeeting" width=""></el-table-column>
        <el-table-column label="谈话教育" prop="education" width=""></el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="text" @click="loadDetails(scope.row.myId)"><img src="../../../../static/icon/home/icon_details.png"><p>详情</p></el-button>
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
  import Area from './Area.js'
  export default Area
</script>

<style>
  @import "../prisoner.css";
</style>
