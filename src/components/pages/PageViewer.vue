<template>
    <div class="h-100">
        <div v-if="!customViewer" id="embed" style="width: 100%; height: 100%;"></div>
        <iframe v-if="customViewer" :src="customUrl" width="100%" height="100%" class="no-borders"></iframe>
    </div>
</template>
<script>
import scriptjs from 'scriptjs'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      customUrl: null
    }
  },
  computed: {
    ...mapGetters(['oidcAccessToken', 'getCloudById', 'getCustomUrl']),
    customViewer () {
      return !!this.getCustomUrl && this.customUrl
    }
  },
  methods: {
    ...mapMutations({
      mutateCurrentCloud: 'SET_CURRENT_CLOUD'
    }),
    setCurrentCloud () {
      const cloud = this.getCloudById(this.$route.params.cloudId)
      this.mutateCurrentCloud(cloud)
    },
    createViewer (params, callback) {
      if (this.getCustomUrl) {
        this.customUrl = `${this.getCustomUrl}/?cloudId=${params.cloudId}&projectId=${params.projectId}&ifcId=${params.ifcId}&accessToken=${this.oidcAccessToken}`
      } else {
        scriptjs(`${process.env.BD_CDN_BASE_URL}/js/bimdata-viewer-embed.js`, () => {
          window.BIMDataViewer('embed', {
            accessToken: this.oidcAccessToken,
            cloudId: parseInt(params.cloudId),
            projectId: parseInt(params.projectId),
            ifcId: parseInt(params.ifcId)
          })
        })
      }
      callback()
    }
  },
  created () {
    this.setCurrentCloud()
    const params = this.$route.params
    this.$store.commit('SET_LOADER_PAGE', true)
    let vm = this
    this.createViewer(params, function () {
      vm.$store.commit('SET_LOADER_PAGE', false)
    })
  }
}
</script>
