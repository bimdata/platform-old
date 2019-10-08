/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */
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
