<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
        toJSON: ''
      }
  }
}
</script>

<style>
  @import url('assets/cssreset.css');

  #app {
    /*width: 1890px;*/
    height: 1000px;
  }
</style>
