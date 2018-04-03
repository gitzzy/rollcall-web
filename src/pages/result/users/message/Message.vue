<template>
  <transition name="fade">
    <div class="alert" v-if="isShow">
      <div class="top">
        <div class="header">
          人员详情
          <div class="close" @click="close"></div>
        </div>
        <div class="content">
          <ul>
            <li class="name">{{ content.name }}</li>
            <li>监&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区<span>{{ content.areaName }}</span></li>
            <li>监&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;室<span>{{ content.roomName }}</span></li>
            <li>身份证号<span>{{ content.personNum }}</span></li>
            <li>囚&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号<span>{{ content.workNum }}</span></li>
          </ul>
          <div class="picture-wrap">
            <div class="picture-box">
              <div class="picture">
                <img :src="content.idPhoto">
              </div>
              <div class="picture-type">证件照片</div>
            </div>
            <div class="picture-box">
              <div class="picture">
                <img :src="content.regPhoto">
              </div>
              <div class="picture-type">采集照片</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="content">
          <ul class="list-1">
            <li>刑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期
              <el-tooltip class="item" effect="dark" :content="content.prisonterm" placement="top">
                <span>{{ content.prisonterm }}</span>
              </el-tooltip>
            </li>
            <li class="padding-36">在监状态<span>{{ content.prisonState }}</span></li>
            <li>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别<span>{{ content.sex }}</span></li>
            <li>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族
              <el-tooltip class="item" effect="dark" :content="content.nation" placement="top">
                <span>{{ content.nation }}</span>
              </el-tooltip>
            </li>
          </ul>
          <ul class="list-2">
            <li>入监时间<span>{{ content.enterDate }}</span></li>
            <li class="padding-36">出监时间<span>{{ content.leaveDate }}</span></li>
            <li>出生日期<span>{{ content.birthday }}</span></li>
            <li>住&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址
              <el-tooltip class="item" effect="dark" :content="content.address" placement="top">
                <span>{{ content.address }}</span>
              </el-tooltip>
            </li>
          </ul>
        </div>
        <div class="condition">
          <div class="header">特征码状态</div>
          <div class="status" v-if="content.feature === '0'">
            <img src="../../../../../static/images/icon_lose.png">
          </div>
          <div class="status" v-else-if="content.feature === '1'">
            <img src="../../../../../static/images/icon_valid.png">
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Message from './Message.js'

  export default Message
</script>

<style>
  @import "Message.css";
</style>
