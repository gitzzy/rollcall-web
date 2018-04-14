<template>
  <div class="duty-list">
    <div class="nav-bar">
      <label class="f-left">值小岗点名新增</label>
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
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="时间">
              <el-time-picker v-model="form.time" :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
              }" placeholder="请选择时间"></el-time-picker>
            </el-form-item>
          </el-form>
          <p class="tips"><i class="el-icon-warning"></i>注:值小岗轮次间隔为一小时以上</p>
          <!--<el-checkbox v-model="isEnable">是否启用</el-checkbox>-->
          <div class="query-btn-area">
            <el-button round class="my-btn-duty add" icon="el-icon-plus" @click="handleAddTime">添加</el-button>
          </div>
          <div class="time-list">
            <ul>
              <li v-for="(time, index) in showTime">{{time}}<button @click="handleDelTime(index)">删除</button></li>
            </ul>
          </div>
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
  @import "./Add.css";
  .el-message-box__input {
    padding-top: 0;
  }
  .el-textarea__inner {
    height: 200px;
    color: #666;
    font-size: 16px;
  }
</style>
