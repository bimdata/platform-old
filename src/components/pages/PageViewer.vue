<template>
    <div>
        <div id="embed" style="width: 100%; height: 500px;" ></div>
    </div>
</template>
<script>
import scriptjs from 'scriptjs'

export default {
  created () {
    scriptjs('https://cdn-beta.bimdata.io/js/bimdata-viewer-embed.js', () => {
      window.BIMDataViewer('embed', {
        accessToken: localStorage.getItem('token'),
        cloudId: parseInt(this.$route.params.cloudId),
        projectId: parseInt(this.$route.params.projectId),
        ifcId: parseInt(this.$route.params.ifcId)
      })
    })
  }
}
</script>
