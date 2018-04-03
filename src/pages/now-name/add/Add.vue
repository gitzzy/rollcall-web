<template>
  <div class="timed-roll-call">
    <div class="nav-bar">
      <label class="f-left">即时点名新增</label>
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
        <div class="areas-content-head"></div>

        <div class="rooms-list">
          <div class="rooms-list-head">
            {{ areasName }}
          </div>
          <el-button round
                     class="my-btn add-check-all"
                     @click="checkAll"
                     :class="{'notAllCheck': isAllRoom}"
                     ref="checkBtn">
            <span v-if="!isAllRoom">
              全选
            </span>
            <span v-else>
              反选
            </span>
          </el-button>

          <div class="ang-rooms">
            <ang-room
              v-for="room in roomsData"
              :room="room"
              :key="room.id"
              :flag="true"
              @getRoomCount="getRoomCount"></ang-room>
          </div>
        </div>

        <div class="form-btn">
          <button class="my-btn-named my-btn-named-ghost" @click="addName"><span class="btn-icon btn-icon-submit"></span>确定</button>
          <button class="my-btn-named my-btn-named-ghost" @click="resetStatus"><span class="btn-icon btn-icon-reset"></span>重置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Add from './Add.js'

  export default Add
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
  .el-message-box__input {
    padding-top: 0;
  }
  .el-textarea__inner {
    height: 200px;
    color: #666;
    font-size: 16px;
  }
</style>
