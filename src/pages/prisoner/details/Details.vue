<template>
  <div class="prisoner details">

    <message :content="alertData" :isShow="showAlert" @close="closeAlert"></message>

    <div class="nav-bar">
      <div class="query-form">
        <el-button round class="my-btn re-home" icon="el-icon-refresh" @click="reHome">返回上级</el-button>
      </div>
    </div>
    <div class="table-area">
      <div class="data-area f-left">
        <div class="title">{{roomTitle}}在押人员概况</div>
        <div class="collapse-area">
          <el-collapse accordion>
            <el-collapse-item :title="detailData.allCnt.name" name="1">
              <div>{{detailData.allCnt.content}}</div>
            </el-collapse-item>
            <el-collapse-item :title="detailData.leavePrison.name" name="2">
              <div>{{detailData.leavePrison.content}}</div>
            </el-collapse-item>
            <el-collapse-item :title="detailData.arraignmentCnt.name" name="3">
              <div>{{detailData.arraignmentCnt.content}}</div>
            </el-collapse-item>
            <el-collapse-item :title="detailData.escortCnt.name" name="4">
              <div>{{detailData.escortCnt.content}}</div>
            </el-collapse-item>
            <el-collapse-item :title="detailData.inCustodyCnt.name" name="5">
              <div>{{detailData.inCustodyCnt.content}}</div>
            </el-collapse-item>
            <el-collapse-item :title="detailData.outsideHealth.name" name="6">
              <div>{{detailData.outsideHealth.content}}</div>
            </el-collapse-item>
            <el-collapse-item :title="detailData.confinementCnt.name" name="7">
              <div>{{detailData.confinementCnt.content}}</div>
            </el-collapse-item>
            <el-collapse-item :title="detailData.lawyerMeeting.name" name="8">
              <div>{{detailData.lawyerMeeting.content}}</div>
            </el-collapse-item>
            <el-collapse-item :title="detailData.familyMeeting.name" name="9">
              <div>{{detailData.familyMeeting.content}}</div>
            </el-collapse-item>
            <el-collapse-item :title="detailData.education.name" name="10">
              <div>{{detailData.education.content}}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="picture-area f-left">
        <el-carousel height="834px" :autoplay="false">
          <el-carousel-item v-for="(item, index) in carousel" :key="index">
            <ul class="picture-content clearfix">

              <li class="picture-item" v-for="ic in item" :key="ic.id" @click="showDetails(ic.myid, ic.id)">
                <div class="picture-wrap">
                  <img :src="ic.regphoto">
                </div>
                <div class="picture-info">
                  <div class="reason warning-status" v-if="ic.RcStatus !== '在押'">{{ic.RcStatus}}</div>
                  <div class="reason normal-status" v-else-if="ic.RcStatus === '在押'">{{ic.RcStatus}}</div>
                  <ul>
                    <li><p class="name">编号</p><p class="value">{{ic.worknum}}</p></li>
                    <li><p class="name">姓名</p><p class="value">{{ic.name}}</p></li>
                  </ul>
                </div>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Details from './Details.js'
  export default Details
</script>

<style>
  @import "../prisoner.css";
  @import "./Details.css";
</style>
