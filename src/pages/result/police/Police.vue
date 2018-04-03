<template>
  <div class="police-modify">

    <message
      :content="alertData"
      :picData="alertPic"
      :policeData="policeStatus"
      :isShow="showAlert"
      @close="closeAlert"></message>

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
      <div class="num-card">
        <p>人工确认数</p>
        <p class="danger-p">{{resObj.confirm}}</p>
      </div>
    </div>
    <div class="table-area">
      <el-table :data="shiftData" v-loading="loading" height="860" style="width: 100%;">
        <el-table-column label="监区" prop="areaName"></el-table-column>
        <el-table-column label="监室" prop="roomName"></el-table-column>
        <el-table-column label="编号" prop="workNum"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="民警确认" prop="statusObj">
          <template slot-scope="scope">
            <el-select v-model="scope.row.lastStatus" placeholder="请选择">
              <el-option
                v-for="(item, key) in scope.row.statusObj"
                :key="key"
                :value-key="key"
                :label="item"
                :value="key">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetails(scope.row)">
              <img src="../../../../static/icon/home/icon_details_duty.png"><p>详情</p></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="button-area">
        <el-button round class="my-btn" icon="el-icon-circle-close" @click="cancel">取消</el-button>
        <el-button round class="my-btn" icon="el-icon-circle-check" @click="policeConfirmAll">民警确认</el-button>
        <el-button round class="my-btn" icon="el-icon-refresh" @click="reHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Police from './Police.js'

  export default Police
</script>

<style>
  @import './Police.css';
</style>
