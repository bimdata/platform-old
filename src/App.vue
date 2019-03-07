<template>
  <div id="app" :class="this.$route.name">
    <router-view />
  </div>
</template>

<script>
import '@/icons'

export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import './assets/scss/app.scss';
</style>
