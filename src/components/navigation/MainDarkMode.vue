<template>
  <div id="page">
    <input type="checkbox" id="theme-toggle" v-model="nightMode">
    <label for="theme-toggle"><span></span></label>
  </div>
</template>
<script>
export default {
  watch: {
    nightMode: function () {
      localStorage.setItem('nightMode', JSON.stringify(this.nightMode))
      console.log('Night Mode: ' + JSON.stringify(this.nightMode))
    }
  },
  data () {
    return {
      nightMode: localStorage.getItem('nightMode') || false
    }
  }
}
</script>
