<template>
    <div class="h-100">
        <div v-if="!customViewer" id="embed" style="width: 100%; height: 100%;" ></div>
        <iframe v-if="customViewer" :src="customUrl" width="100%" height="100%"></iframe>
    </div>
</template>
<script>
import scriptjs from 'scriptjs'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      customViewer: false
    }
  },
  computed: {
    ...mapGetters(['oidcAccessToken'])
  },
  created () {
    let params = this.$route.params
    if (params.customUrl) {
      this.customViewer = true
      this.customUrl = `${params.customUrl}/?cloudId=${params.cloudId}&projectId=${params.projectId}&ifcId=${params.ifcId}&accessToken=${this.oidcAccessToken}`
    } else {
      scriptjs('https://cdn-staging.bimdata.io/js/bimdata-viewer-embed.js', () => {
        window.BIMDataViewer('embed', {
          accessToken: this.oidcAccessToken,
          cloudId: parseInt(params.cloudId),
          projectId: parseInt(params.projectId),
          ifcId: parseInt(params.ifcId)
        })
      })
    }
  }
}
</script>
