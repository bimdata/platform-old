<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div class="h-100">
        <iframe :src="viewerUrl" width="100%" height="100%" class="no-borders" v-if="iframeViewer === true"></iframe>
        <BimdataViewer
          ref="bimdataViewerInstance"
          v-if="iframeViewer === false"
          :accessToken="oidcAccessToken"
          :cfg="cfg"
        />
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import BimdataViewer from '@bimdata/viewer'

export default {
  data () {
    return {
      viewerUrl: null,
      iframeViewer: null,
      cfg: null
    }
  },
  components: {
    BimdataViewer
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
      if (this.getCustomUrl === 'old_viewer') {
        this.iframeViewer = true
        this.viewerUrl = `${process.env.BD_VIEWER_BASE_URL}/?cloudId=${params.cloudId}&projectId=${params.projectId}&ifcId=${params.ifcId}&accessToken=${this.oidcAccessToken}`
      } else if (this.getCustomUrl) {
        this.iframeViewer = true
        this.viewerUrl = `${this.getCustomUrl}/?cloudId=${params.cloudId}&projectId=${params.projectId}&ifcId=${params.ifcId}&accessToken=${this.oidcAccessToken}`
      } else {
        this.iframeViewer = false
        this.cfg = {
          cloudId: params.cloudId,
          projectId: params.projectId,
          ifcIds: [params.ifcId],
          apiUrl: process.env.BD_API_BASE_URL,
          bimdataPlugins: {
            warning: false
          }
        }
        this.$nextTick(() => {
          // Register plugin here
          this.$refs.bimdataViewerInstance.registerPlugins([])
        })
      }
      callback()
    }
  },
  mounted () {
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
