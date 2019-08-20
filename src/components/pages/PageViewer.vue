<template>
    <div class="h-100">
        <iframe :src="viewerUrl" width="100%" height="100%" class="no-borders" v-if="iframeViewer"></iframe>
        <BimdataViewer
          v-if="!iframeViewer"
          :apiUrl="apiUrl"
          :accessToken="oidcAccessToken"
          :ifcConfig="ifcConfig"
          :plugins="plugins"
        />
    </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex'
import BimdataViewer from '@bimdata/viewer'
import store from '../../store'

Vue.use(BimdataViewer, { store });

export default {
  data () {
    return {
      viewerUrl: null,
      iframeViewer: null,
      plugins: [],
      ifcConfig: {},
      apiUrl: process.env.BD_API_BASE_URL
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
      if (this.getCustomUrl === 'viewer_2') {
        this.iframeViewer = false
        this.ifcConfig = {
          cloudId: params.cloudId,
          projectId: params.projectId,
          ifcIds: [params.ifcId]
        }
      } else if (this.getCustomUrl) {
        this.iframeViewer = true
        this.viewerUrl = `${this.getCustomUrl}/?cloudId=${params.cloudId}&projectId=${params.projectId}&ifcId=${params.ifcId}&accessToken=${this.oidcAccessToken}`
      } else {
        this.iframeViewer = true
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
