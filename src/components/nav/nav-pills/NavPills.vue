<template>
  <div class="nav-pills">
    <ul class="pills" :class="navClass">
      <li v-for="nav in navData">
        <router-link :to="nav.href" class="pills-item">{{nav.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import NavPills from './NavPills.js'

  export default NavPills
</script>

<style scoped>
  @import "./NavPills.css";
</style>
