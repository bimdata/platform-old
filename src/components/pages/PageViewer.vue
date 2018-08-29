<template>
    <div>
        <div id="embed" style="width: 100%; height: 500px;" ></div>
    </div>
</template>
<script>
import scriptjs from 'scriptjs'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['oidcAccessToken'])
  },
  created () {
    scriptjs('https://cdn-staging.bimdata.io/js/bimdata-viewer-embed.js', () => {
      window.BIMDataViewer('embed', {
        accessToken: this.oidcAccessToken,
        cloudId: parseInt(this.$route.params.cloudId),
        projectId: parseInt(this.$route.params.projectId),
        ifcId: parseInt(this.$route.params.ifcId)
      })
    })
  }
}
</script>
