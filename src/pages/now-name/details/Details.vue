<template>
  <div class="timed-roll-call">
    <div class="nav-bar">
      <label class="f-left">即时点名详情</label>
      <div class="pills-nav-area">
        <!--<el-button round class="my-btn-named">全选</el-button>-->
      </div>
      <div class="control-btn">
        <el-button round class="my-btn-named" icon="el-icon-edit-outline" @click="openMemoMessage">备注</el-button>
        <el-button round class="my-btn-named" icon="el-icon-refresh" @click="backPage">返回上级</el-button>
      </div>
    </div>

    <div class="content-area">
      <div class="areas-menu">
        <ang-menu
          :menuData="allData"
          @listenClick="showRooms"></ang-menu>
      </div>

      <div class="areas-content">
        <div class="areas-content-head">
          <div class="query-form">
            <label class="my-label">时间</label>
            <el-date-picker
              v-model="selectedDate"
              :disabled="true"
              type="datetime">
            </el-date-picker>
          </div>
        </div>

        <div class="rooms-list">
          <div class="rooms-list-head">
            {{ areasName }}
          </div>

          <div class="ang-rooms">
            <ang-room
              v-for="room in roomsData"
              :room="room"
              :key="room.id"
              :flag="false"></ang-room>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Details from './Details.js'

  export default Details
</script>

<style>
  @import "../now-name.css";
  .el-cascader__label {
    line-height: 45px;
  }
  .add-check-all {
    position: absolute;
    top: 50px;
    left: 20px;
  }
</style>
