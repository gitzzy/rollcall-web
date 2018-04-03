<template>
  <transition name="fade">
    <div class="police-alert" v-if="isShow">
      <div class="top">
        <div class="header">
          点名结果详情
          <div class="close" @click="close"></div>
        </div>
        <div class="police-content">
          <div class="picture-wrap">
            <div class="picture-box">
              <div class="picture" v-if="picData.regPhoto">
                <img :src="picData.regPhoto">
              </div>
            </div>
          </div>
          <ul>
            <li>范&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;围<span>{{ content.roomName }}</span></li>
            <li>编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号<span>{{ content.workNum }}</span></li>
            <li>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名<span>{{ content.name }}</span></li>
            <li>失败原因<span>{{ content.reason }}</span></li>
            <li>民警处理<span>
              <el-select v-model="content.lastStatus" placeholder="请选择">
              <el-option
                v-for="(item, key) in policeData"
                :key="key"
                :value-key="key"
                :label="item"
                :value="key">
              </el-option>
            </el-select>
            </span></li>
          </ul>

        </div>
      </div>
      <div class="bottom">
        <div class="police-content">
          <ul :style="{width: ulWidth, marginLeft: scrollWidth}">
            <li v-for="pic in picList"
                @click="handleSelect(pic.recordId)"
                :class="{active: picId === pic.recordId}">
              <img :src="pic.url">
            </li>
          </ul>
        </div>
        <div class="condition">
          <div class="header">点名失败前留像</div>
          <div class="status" v-if="content.feature === '0'">
            <img src="../../../../../static/images/icon_lose.png">
          </div>
          <div class="status" v-else-if="content.feature === '1'">
            <img src="../../../../../static/images/icon_valid.png">
          </div>
        </div>
        <div class="dir-btn fl" @click="handleScroll(-1)"><i class="el-icon-arrow-left"></i></div>
        <div class="dir-btn fr" @click="handleScroll(1)"><i class="el-icon-arrow-right"></i></div>
        <div class="alert-btn-area">
          <el-button round class="my-alert-btn" icon="el-icon-circle-close" @click="close">取消</el-button>
          <el-button round class="my-alert-btn" icon="el-icon-circle-check" @click="submitPolice">确认</el-button>
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
