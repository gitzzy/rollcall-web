<template>
  <div class="home">
    <div class="nav-area">
      <div class="real-time-area">
        <div class="h-btn-wrap" @click="openNamePage()">
          <div class="btn-icon">
            <img :src="monitor.src">
          </div>
          <div class="btn-name">{{ monitor.name }}</div>
        </div>
      </div>
      <ul class="nav-list clearfix">
        <li v-for="img in imageData">
          <home-btn :imgSrc="img.src" :name="img.name" :flag="img.flag" :isClick="img.isClick" @routerModule="routerModule"></home-btn>
        </li>
      </ul>
    </div>
    <!--在押人员概况-->
    <div class="module-wrap survey">
      <div class="module-title">
        <h3 @click="skipRoute('/prisoner/areas')">在押人员今日概况</h3>
      </div>
      <div class="module-content">
        <div class="query-form">
          <el-form ref="form" :inline="true" :model="form" label-width="80px">
            <el-form-item label="范围">
              <el-select v-model="form.areas" placeholder="请选择类型" @change="getPrisoner">
                <el-option
                  v-for="range in rangeList"
                  :label="range.name"
                  :value="range.id"
                  :key="range.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="data-card card-1">
          <div class="data-item item-1">
            <p class="item-name">总人数</p>
            <p class="item-content">{{prisoner.allCnt}}</p>
          </div>
          <div class="data-item item-2">
            <p class="item-name">男</p>
            <p class="item-content">{{prisoner.male}}</p>
          </div>
          <div class="data-item item-3">
            <p class="item-name">女</p>
            <p class="item-content">{{prisoner.female}}</p>
          </div>
          <div class="data-item item-4">
            <p class="item-name">监室</p>
            <p class="item-content">{{prisoner.rooms}}</p>
          </div>
        </div>
        <div class="data-card card-2">
          <div class="data-item">
            <p class="item-name">临时出所</p>
            <p class="item-content">{{prisoner.leavePrison}}</p>
          </div>
          <!--<div class="data-item">
            <p class="item-name">入所</p>
            <p class="item-content">{{prisoner.enter}}</p>
          </div>-->
          <div class="data-item">
            <p class="item-name">提讯</p>
            <p class="item-content">{{prisoner.arraign}}</p>
          </div>
          <div class="data-item">
            <p class="item-name">提押</p>
            <p class="item-content">{{prisoner.escort}}</p>
          </div>
        </div>
        <div class="data-card card-3">
          <!--<div class="data-item">
            <p class="item-name">监室调整</p>
            <p class="item-content">{{prisoner.roomChange}}</p>
          </div>-->
          <div class="data-item">
            <p class="item-name">所外就医</p>
            <p class="item-content">{{prisoner.outsideHeal}}</p>
          </div>
          <!--<div class="data-item">
            <p class="item-name">所内巡诊</p>
            <p class="item-content">{{prisoner.insideVisits}}</p>
          </div>-->
          <!--<div class="data-item">
            <p class="item-name">所内就医</p>
            <p class="item-content">{{prisoner.insideHeal}}</p>
          </div>-->
          <div class="data-item">
            <p class="item-name">律师会见</p>
            <p class="item-content">{{prisoner.lawyerMeeting}}</p>
          </div>
          <div class="data-item">
            <p class="item-name">家属会见</p>
            <p class="item-content">{{prisoner.familyMeeting}}</p>
          </div>
          <div class="data-item">
            <p class="item-name">谈话教育</p>
            <p class="item-content">{{prisoner.education}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--点名结果列表-->
    <div class="module-wrap result">
      <div class="module-title">
        <h3 @click="skipRoute('/result')">今日点名结果列表</h3>
      </div>
      <div class="module-content">
        <el-table :data="getShift" v-loading="loading" style="width: 100%;" stripe headerRowClassName="headerClass">
          <el-table-column label="班次" prop="shiftName"></el-table-column>
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
          <el-table-column label="类型" prop="jobTypeName" width="70"></el-table-column>
          <el-table-column label="总人数" prop="totalNum" width="70"></el-table-column>
          <el-table-column label="实点" prop="realNum" width="70"></el-table-column>
          <el-table-column label="外出" prop="outNum" width="70">
            <template slot-scope="scope">
              <div :class="scope.row.outNum !== 0 ? 'statusText-warning' : ''">{{scope.row.outNum}}</div>
            </template>
          </el-table-column>
          <el-table-column label="应点未点" prop="failNum" width="90">
            <template slot-scope="scope">
              <div :class="scope.row.failNum !== 0 ? 'statusText-warning' : ''">{{scope.row.failNum}}</div>
            </template>
          </el-table-column>
          <el-table-column label="补点人数" prop="repairNum" width="90"></el-table-column>
          <el-table-column label="人工确认" prop="confimNum" width="90"></el-table-column>
          <el-table-column label="点名结果" prop="result" width="90">
            <template slot-scope="scope">
              <div class="statusText statusText-normal normal" v-if="scope.row.result === '正常'">正常</div>
              <div class="statusText statusText-warning warning" v-else>异常</div>
            </template>
          </el-table-column>
          <el-table-column label="民警确认" prop="isPoliceConfim" width="90">
            <template slot-scope="scope">
              <div class="statusText statusText-normal" v-if="scope.row.isPoliceConfim === '已确认'">已确认</div>
              <div class="statusText statusText-warning" v-if="scope.row.isPoliceConfim === '部分确认'">部分确认</div>
              <div class="statusText statusText-warning" v-else>未确认</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="235">
            <template slot-scope="scope">
              <el-button type="text" @click="loadResultDetails(scope.row.shiftId, scope.row.shiftName)"><img src="static/icon/home/icon_details.png"><p>详情</p></el-button>
              <el-button type="text" @click="policeConfirm('result-police',
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
              <el-button type="text" @click="repair('repair',
                                      scope.row.loopId,
                                      scope.row.shiftId,
                                      scope.row.date,
                                      scope.row.time,
                                      scope.row.jobTypeName,
                                      scope.row.totalNum,
                                      scope.row.realNum,
                                      scope.row.outNum,
                                      scope.row.failNum,
                                      scope.row.repairNum)"><img src="static/icon/home/icon_repair.png"><p>补点</p></el-button>
              <el-button type="text" style="color: #ccc;"><img src="static/icon/home/icon_print.png"><p>打印</p></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--值小岗结果列表-->
    <div class="module-wrap duty">
      <div class="module-title">
        <h3 @click="skipRoute('/duty/result')">今日值小岗结果列表</h3>
      </div>
      <div class="module-content">
        <el-table :data="getDuty" v-loading="loading" style="width: 100%;" stripe :row-class-name="tableRowClassName">
          <el-table-column label="日期" prop="rcDate" width="110"></el-table-column>
          <el-table-column label="时间" prop="rcTime" width="80"></el-table-column>
          <el-table-column label="范围" prop="areaName" width="62">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.areaName" placement="top">
                <div class="cell">{{scope.row.areaName}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="rcStatus" width="52">
            <template slot-scope="scope">
              <div v-if="scope.row.rcStatus === '正常'">正常</div>
              <div class="statusText-warning" v-else>异常</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="">
            <template slot-scope="scope">
              <el-button type="text"  @click="loadDutyDetails('duty-detail', scope.row.id, scope.row.rcDate)"><img src="static/icon/home/icon_details_duty.png"><p>详情</p></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Login from './Home.js'
  export default Login
</script>

<style>
  @import "Home.css";
</style>
