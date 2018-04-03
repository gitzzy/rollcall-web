<template>
  <div class="repair">
    <div class="operating-area">
      <ul>
        <li><label>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期</label><span>{{resObj.date}} {{resObj.time}}</span></li>
        <li><label>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</label><span>{{resObj.type}}</span></li>
        <li><label>总<i class="zhanwei"></i>人<i class="zhanwei"></i>数</label><span>{{resObj.total}} 人</span></li>
        <li><label>实点人数</label><span>{{resObj.real}} 人</span></li>
      </ul>
      <div class="num-card">
        <p>外出人数</p>
        <p class="warning-p">{{resObj.out}}</p>
      </div>
      <div class="num-card">
        <p>应点未点</p>
        <p class="warning-p">{{resObj.fail}}</p>
      </div>
      <div class="num-card">
        <p>补点人数</p>
        <p class="danger-p">{{resObj.repair}}</p>
      </div>
    </div>
    <div class="table-area">
      <el-table class="my-table" stripe
                v-loading="loading"
                @selection-change="handleSelectionChange"
                :data="shiftData" height="860" style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="监区" prop="areaName"></el-table-column>
        <el-table-column label="监室" prop="roomName"></el-table-column>
        <el-table-column label="编号" prop="workNum"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="补点原因" prop="reason"></el-table-column>
      </el-table>

      <div class="button-area">
        <el-button round class="my-btn" icon="el-icon-circle-close" @click="cancel">取消</el-button>
        <el-button round class="my-btn" icon="el-icon-circle-check" @click="handleRepair">补点</el-button>
        <el-button round class="my-btn" icon="el-icon-refresh" @click="reHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Repair from './Repair.js'

  export default Repair
</script>

<style>
  @import './Repair.css';
  .my-table td {
    padding: 15px 10px !important;
  }
</style>
