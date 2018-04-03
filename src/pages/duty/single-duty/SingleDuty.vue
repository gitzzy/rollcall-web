<template>
  <div class="duty-list">
    <div class="nav-bar">
      <label class="f-left">值小岗点名详情</label>
      <div class="pills-nav-area">
        <!--<el-button round class="my-btn-named">全选</el-button>-->
      </div>
      <div class="control-btn">
        <el-button round class="my-btn" icon="el-icon-edit-outline" @click="openMemoMessage">备注</el-button>
        <el-button round class="my-btn" icon="el-icon-refresh" @click="backPage">返回上级</el-button>
      </div>
    </div>

    <div class="content-area">
      <div class="control-area">
        <div class="control">
          <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="时间">
              <el-time-picker
                :readonly="true"
                :value="form.time"
                placeholder="请选择时间"></el-time-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="areas-menu">
        <ang-menu
          :menuData="allData"
          @listenClick="showRooms"></ang-menu>
      </div>

      <div class="areas-content">
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
  import SingleDuty from './SingleDuty.js'
  export default SingleDuty
</script>

<style>
  @import "./SingleDuty.css";
  .el-message-box__input {
    padding-top: 0;
  }
  .el-textarea__inner {
    height: 200px;
    color: #666;
    font-size: 16px;
  }
</style>
