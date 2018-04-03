<template>
  <div class="rooms-item"
       :class="{'rooms-item-check': roomData.status === 0}"
       @click="flag && checkRoom(roomData.status)">
    {{ roomData.name }}
  </div>
</template>

<script type="text/ecmascript-6">
  import AngRoom from './AngRoom.js'
  export default AngRoom
</script>

<style scoped>
  @import "AngRoom.css";
</style>
