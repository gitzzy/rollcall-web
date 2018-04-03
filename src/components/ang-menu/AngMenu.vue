<template>
  <div class="ang-menu">
    <ul :style="menuStyle">
      <li class="menu-item"
          v-for="(menu, index) in menuData"
          @click="checkMenu(index, menu.id)"
          :class="{'menu-item-active': index === checkedIndex}">
        <span class="menu-item-icon"></span>
        <span class="menu-item-text">{{ menu.name }}</span>
        <div class="check-room" v-if="menu.roomCount > 0">
          <div>选中</div>
          <div><span class="room-count">{{ menu.roomCount }}</span><span>间</span></div>
        </div>
      </li>
    </ul>
    <div class="caret-content" v-if="menuData.length > 8">
      <div class="caret-icon caret-icon-bottom" @click="moveBottom"></div>
      <div class="caret-icon caret-icon-top" @click="moveTop"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import AngMenu from './AngMenu.js'
  export default AngMenu
</script>

<style scoped>
  @import "./AngMenu.css";
</style>
