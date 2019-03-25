<template>
    <div class="h-100">
        <iframe :src="viewerUrl" width="100%" height="100%" class="no-borders"></iframe>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      viewerUrl: null
    }
  },
  computed: {
    ...mapGetters(['oidcAccessToken', 'getCloudById', 'getCustomUrl'])
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
        this.viewerUrl = `${this.getCustomUrl}/?cloudId=${params.cloudId}&projectId=${params.projectId}&ifcId=${params.ifcId}&accessToken=${this.oidcAccessToken}`
      } else {
        this.viewerUrl = `${process.env.BD_VIEWER_BASE_URL}/?cloudId=${params.cloudId}&projectId=${params.projectId}&ifcId=${params.ifcId}&accessToken=${this.oidcAccessToken}`
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
