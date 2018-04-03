<template>
  <div class="btn-wrap" :class="flag" @click="isClick && routerModule(flag)">
    <div class="btn-icon">
      <img :src="imgSrc">
    </div>
    <div class="btn-name">{{name}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeBtn from './HomeBtn.js'

  export default HomeBtn
</script>

<style scoped>
  .btn-wrap {
    width: 140px;
    cursor: pointer;
  }
  .btn-wrap .btn-icon {
    margin-left: 11px;
    width: 118px;
    height: 118px;
    overflow: hidden;
  }
  .btn-wrap .btn-icon img {
    width: 100%;
    height: 100%;
  }
  .btn-wrap .btn-name {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
</style>
